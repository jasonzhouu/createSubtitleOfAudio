function addEventToAudioController(audioWave) {
    $("#play").on("click", function () {
        audioWave.playPause();
    });
    $("#forward").click(function () {
        audioWave.skip(5);
    });
    $("#backward").click(function () {
        audioWave.skip(-5);
    });
}

function addExportJsonEvent(timeSlice) {
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

function addNewRowEvent(timeSlice) {
    // add new row
    $('#addSlice').click(function () {
        timeSlice.addNewSlice()
        table.refresh()
        disableNewRowButton(timeSlice.getLastSlice())
    })
}

let option = {
    content: "",
    trigger: "hover",
    placement: "auto",
}

function addPopOver() {
    $("#saveToJsonFile").popover({
        ...option,
        content: "将字幕保存到JSON文件",
    })
}


export default function addEventToButtons(audioWave, timeSlice) {
    addEventToAudioController(audioWave)
    addExportJsonEvent(timeSlice)
    addNewRowEvent(timeSlice)
    addPopOver()
}