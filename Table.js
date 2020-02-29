import {wavesurfer} from './wavesurfer.js'

export default function Table(timeSlice){
    this.timeSlice = timeSlice;
}

Table.prototype.initTable = function() {
    this.timeSlice.forEach((element, index, array) => {
        var lastRow = (index == (array.length -1))
        this.addRow(element, index, lastRow)
    })
}

Table.prototype.addRow = function(slice, index, lastRow) {
    var newRow = $('<tr></tr>').append(
        $("<th></th>").html(index)
    ).append(
        $("<td></td>").html(slice.start)
    ).append(
        $("<td></td>").html(slice.end)
    ).append(
        $('<td contenteditable="true"></td>').html(slice.note)
    )
    this.addEvent(newRow, lastRow)
    $("#timeSliceTable tbody").append(newRow)
}

Table.prototype.addEvent = function(row, lastRow) {
    if (lastRow) {
        this.addEventToLastRow(row)
    } else {
        this.addEventToFormerRow(row)
    }
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
    let currentSlice = this.timeSlice[this.timeSlice.length-1]
    row.children('td').eq(0).click(function(){
        let startTime = wavesurfer.getCurrentTime()
        $(this).html(startTime)
        currentSlice.start = startTime
    })
    row.children('td').eq(1).click(function(){
        let endTime = wavesurfer.getCurrentTime()
        $(this).html(endTime)
        currentSlice.end = endTime
    })
}

// @todo: change note, keyup event