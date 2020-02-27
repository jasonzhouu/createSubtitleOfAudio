import {timeSlice} from './timeSlice.js'

$("#saveToJsonFile").on("click", function () {
    ipcRenderer.send('save-as-json-file', timeSlice)
})

ipcRenderer.on('save-file-finished', (event, arg) => {
    console.log("save file: " + arg)
})