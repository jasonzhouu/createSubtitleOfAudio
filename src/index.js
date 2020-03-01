import initTimeSlice from './initTimeSlice.js'
import Table from './Table.js'
import disableNewRowButton from './disableAddNewRow.js'
import addAudioController from './audioController.js'

var timeSlice = initTimeSlice()

var table = new Table(timeSlice)

addAudioController()

// add new row
$('#addSlice').click(function() {
    timeSlice.newSlice()
    table.refresh()
    disableNewRowButton(timeSlice)
})

$("#saveToJsonFile").on("click", function () {
    // 将数据发送到主进程，消息类型：save-as-json-file
    ipcRenderer.send('save-as-json-file', timeSlice)
})

// 接收主进程返回的消息
ipcRenderer.on('save-file-finished', (event, arg) => {
    console.log("save file: " + arg)
})