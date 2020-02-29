import {wavesurfer} from './wavesurfer.js'

export default function Table(timeSlice){
    this.timeSlice = timeSlice;
}

Table.prototype.initTable = function() {
    this.timeSlice.forEach((element, index) => {
        this.addRow(element, index)
    })
}

Table.prototype.addRow = function(slice, index) {
    var newRow = $('<tr></tr>').append(
        $("<th></th>").html(index)
    ).append(
        $("<td></td>").html(slice.start)
    ).append(
        $("<td></td>").html(slice.end)
    ).append(
        $('<td contenteditable="true"></td>').html(slice.note)
    )
    this.addEvent(newRow, index)
    $("#timeSliceTable tbody").append(newRow)
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
    row.children('td').click(function(){
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
        $(this).html(startTime)
        lastSlice.start = startTime
    })
    row.children('td').eq(1).click(function(){
        let endTime = wavesurfer.getCurrentTime()
        $(this).html(endTime)
        lastSlice.end = endTime
    })
}

Table.prototype.addChangeNoteEvent = function(row, index) {
    let self = this;
    row.children('td').last().keyup(function() {
        let note = $(this).html()
        self.timeSlice[index].note = note
    })
}




// @todo: save to store