import {wavesurfer} from './wavesurfer.js'

// 一个数组，保存着所有句子的数据
var timeSlice = [];
// 一个对象，保存当前句子的数据。提交时，将其保存到timeSlice数组，并清空currentSlice对象。
var currentSlice = {};

function addNewRow() {
    var newRow = $('<tr class="editableRow"></tr>').append(
        $("<th></th>").html(timeSlice.length + 1)
    ).append(
        $("<td></td>")
    ).append(
        $("<td></td>")
    ).append(
        $('<td contenteditable="true"></td>')
    )
    newRow.children("td").eq(0).click(function () {
        currentSlice.start = wavesurfer.getCurrentTime()
        $(this).html(currentSlice.start)
    })
    newRow.children("td").eq(1).click(function(){
        currentSlice.end = wavesurfer.getCurrentTime()
        $(this).html(currentSlice.end)
    })
    $("#timeSliceTable tbody").append(newRow)
}
addNewRow()

$("#addSlice").click(function(){
    currentSlice.note = $("#timeSliceTable tbody tr:last td:last").html()
    // editableRow class的样式不一样。添加后，应该把这个样式去掉。
    $("#timeSliceTable tbody tr:last").removeClass("editableRow")
    // @todo: 检查currentSlice是否符合要求，各属性不能为空
    timeSlice.push({ ...currentSlice })
    currentSlice = {}
    console.log(timeSlice);
    addNewRow()
})


export {timeSlice, currentSlice}