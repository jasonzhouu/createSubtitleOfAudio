import {wavesurfer} from './wavesurfer.js'

// 一个数组，保存着所有句子的数据
var timeSlice = [];
// 一个对象，保存当前句子的数据。提交时，将其保存到timeSlice数组，并清空currentSlice对象。
var currentSlice = {};

function addNewRow() {
    $("#timeSliceTable tbody").append(
        $("<tr></tr>").append(
            $("<th>1</th>").html(timeSlice.length + 1)
        ).append(
            $("<td>2</td>")
        ).append(
            $("<td>3</td>")
        ).append(
            $("<td>4</td>")
        )
    )
}
addNewRow()

$("#start").click(function () {
    currentSlice.start = wavesurfer.getCurrentTime();
    $("#start + span").html(currentSlice.start)
})


$("#end").click(function () {
    currentSlice.end = wavesurfer.getCurrentTime();
    $("#end + span").html(currentSlice.end)
})

$("#submit").click(function () {
    currentSlice.note = $("#note").val();
    timeSlice.push({ ...currentSlice });
    printSliceInfo();
    clearData();
})

function printSliceInfo() {
    $("#timeSliceTable tbody").append(
        $("<tr></tr>").append(
            $("<th></th>").html(timeSlice.length).attr("scope", "row")
        ).append(
            $("<td></td>").html(currentSlice.start)
        ).append(
            $("<td></td>").html(currentSlice.end)
        ).append(
            $("<td></td>").html(currentSlice.note)
        )
    )
}

function clearData() {
    $("#start + span").html("");
    $("#end + span").html("");
    $("#note").val("");
    currentSlice = {};
}



export {timeSlice, currentSlice}