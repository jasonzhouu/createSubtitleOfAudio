import wavesurfer from './wavesurfer.js'

export default function Table(timeSlice){
    // 与外面的timeSlice公用一个，所以当的timeSlice发生任何更改，这个也会发生变化。
    this.timeSlice = timeSlice;
    this.addTable()
}

Table.prototype.addTable = function() {
    this.timeSlice.forEach((element, index) => {
        this.addRow(element, index)
    })
}

Table.prototype.refresh = function() {
    $("#timeSliceTable tbody").html('')
    this.addTable()
}

Table.prototype.addRow = function(slice, index) {
    var newRow = $('<tr></tr>').append(
        $("<th></th>").html(index)
    ).append(
        $("<td></td>").html(
            this.decreaseNumberAccuracy(slice.start)
            )
    ).append(
        $("<td></td>").html(
            this.decreaseNumberAccuracy(slice.end)
            )
    ).append(
        $('<td contenteditable="true"></td>').html(slice.note)
    )
    this.addEvent(newRow, index)
    $("#timeSliceTable tbody").append(newRow)
}

Table.prototype.decreaseNumberAccuracy = function(num) {
    if (num == null || num == undefined) {
        return 0
    } else if(typeof(num) == 'number') {
        return num.toFixed(1)
    }
}

Table.prototype.addEvent = function(row, index) {
    var whetherLastRow = (index == (this.timeSlice.length -1))
    if (whetherLastRow) {
        this.addEventToLastRow(row)
    } else {
        this.addEventToFormerRow(row)
    }
    this.addChangeNoteEvent(row, index)
}

Table.prototype.addEventToFormerRow = function(row) {
    row.children('td:lt(2)').click(function(){
        var currentTime = parseFloat(
            $(this).html()
        )
        wavesurfer.play(currentTime)
    })
}

Table.prototype.addEventToLastRow = function(row) {
    let lastSlice = this.timeSlice[this.timeSlice.length-1]
    row.children('td').eq(0).click(function(){
        let startTime = wavesurfer.getCurrentTime()
        // 显示时间精确到小数点后2位数，内存中的数据仍然保留最大的精确度
        $(this).html(startTime.toFixed(1))
        lastSlice.start = startTime
    })
    row.children('td').eq(1).click(function(){
        let endTime = wavesurfer.getCurrentTime()
        $(this).html(endTime.toFixed(1))
        lastSlice.end = endTime
    })
    row.addClass('editableRow')
}

Table.prototype.addChangeNoteEvent = function(row, index) {
    let self = this;
    row.children('td').last().keyup(function() {
        let note = $(this).html()
        self.timeSlice[index].note = note
    })
}
