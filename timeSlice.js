import {wavesurfer} from './wavesurfer.js'

// 一个数组，保存着所有句子的数据
var timeSlice = [];
var currentSlice = {};
// 一个对象，保存当前句子的数据。提交时，将其保存到timeSlice数组，并清空currentSlice对象。
function addNewSlice() {
    timeSlice.push({
        start: null,
        end: null,
        note: null,
    });
    currentSlice = timeSlice[timeSlice.length-1]
}
addNewSlice();


function addNewRow() {
    var newRow = $('<tr class="editableRow"></tr>').append(
        $("<th></th>").html(timeSlice.length)
    ).append(
        $("<td></td>")
    ).append(
        $("<td></td>")
    ).append(
        $('<td contenteditable="true"></td>')
    )
    addEventToNewRow(newRow)
    $("#timeSliceTable tbody").append(newRow)
}
function addEventToNewRow(newRow) {
    newRow.children("td").eq(0).click(function () {
        currentSlice.start = wavesurfer.getCurrentTime()
        $(this).html(currentSlice.start)
    })
    newRow.children("td").eq(1).click(function(){
        currentSlice.end = wavesurfer.getCurrentTime()
        $(this).html(currentSlice.end)
    })
    newRow.children("td[contenteditable=true]").keyup(function(){
        currentSlice.note = $(this).html()
    })
}
addNewRow()

$("#addSlice").click(function(){
    // editableRow class的样式不一样。添加后，应该把这个样式去掉。
    $("#timeSliceTable tbody tr:last").removeClass("editableRow")
    $("#timeSliceTable tbody tr:last td").off("click")
    // 点击跳转到对应的时间播放
    $("#timeSliceTable tbody tr").click(function(){
        var startTime = parseFloat($(this).children("td").eq(0).html())
        var endTime = parseFloat($(this).children("td").eq(1).html())
        wavesurfer.play(startTime, endTime)
    })
    // @todo: 检查currentSlice是否符合要求，各属性不能为空
    addNewSlice()
    addNewRow()
})


export {timeSlice}