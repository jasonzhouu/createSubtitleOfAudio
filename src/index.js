import initTimeSlice from './initTimeSlice.js'
import Table from './Table.js'
import disableNewRowButton from './disableAddNewRow.js'


var timeSlice = initTimeSlice()

var table = new Table(timeSlice)

// add new row
$('#addSlice').click(function() {
    timeSlice.newSlice()
    table.refresh()
    disableNewRowButton(timeSlice)
})

// todo: 组织代码，存放在src目录


$("#saveToJsonFile").on("click", function () {
    // 将数据发送到主进程，消息类型：save-as-json-file
    ipcRenderer.send('save-as-json-file', timeSlice)
})

// 接收主进程返回的消息
ipcRenderer.on('save-file-finished', (event, arg) => {
    console.log("save file: " + arg)
})