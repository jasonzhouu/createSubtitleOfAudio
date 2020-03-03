export default function addExportJsonEvent(timeSlice) {
    // 和主进程IPC通信，保存json文件
    $("#saveToJsonFile").on("click", function () {
        // 将数据发送到主进程，消息类型：save-as-json-file
        ipcRenderer.send('save-as-json-file', timeSlice.get())
    })

    // 接收主进程返回的消息
    ipcRenderer.on('save-file-finished', (event, arg) => {
        console.log("save file: " + arg)
    })
}