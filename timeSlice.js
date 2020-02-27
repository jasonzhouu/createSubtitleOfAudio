// 一个数组，保存着所有句子的数据
var timeSlice = [];
// 一个对象，保存当前句子的数据。提交时，将其保存到timeSlice数组，并清空currentSlice对象。
var currentSlice = {};

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

// @todo: 快捷键，f2控制pause/play，f3/f4控制开始/结尾
// @todo: 导出 json 格式数据，通过ipc发送json给main process，main process将其导出文件到下载目录
// @todo: 拖入音频文件

$("#saveToJsonFile").on("click", function () {
    ipcRenderer.send('save-as-json-file', timeSlice)
})

ipcRenderer.on('save-file-finished', (event, arg) => {
    console.log("save file: " + arg)
})

export {timeSlice, currentSlice}