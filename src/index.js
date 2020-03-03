import TimeSlice from './TimeSlice.js'
import Table from './Table.js'
import disableNewRowButton from './disableAddNewRow.js'
import addAudioController from './audioController.js'
import addPopOver from './popover.js'
import createWaveSurfer from './createWavesurfer.js'

const wavesurfer = createWaveSurfer()

var timeSlice = new TimeSlice('xwz')
var table = new Table(wavesurfer, timeSlice)
table.init()

addAudioController(wavesurfer)
addPopOver()

// add new row
$('#addSlice').click(function() {
    timeSlice.addNewSlice()
    table.refresh()
    disableNewRowButton(timeSlice.getLastSlice())
})

$("#saveToJsonFile").on("click", function () {
    // 将数据发送到主进程，消息类型：save-as-json-file
    ipcRenderer.send('save-as-json-file', timeSlice.get())
})

// 接收主进程返回的消息
ipcRenderer.on('save-file-finished', (event, arg) => {
    console.log("save file: " + arg)
})