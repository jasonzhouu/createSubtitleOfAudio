const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')

const userDataPath = app.getPath("userData")
const audioFilesPath = path.join(userDataPath, 'audioFiles')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        }
    })
    mainWindow.loadFile(path.join(__dirname + '/src/index.html'))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

// ipc 保存音频文件
ipcMain.on('uploadAudioFile', (event, {sourcePath, fileName}) => {
    var status = uploadAudioFile(sourcePath, fileName)
    if (status == undefined) {
        status = "success"
    } else {
        status = "failed"
    }
    // 返回消息给渲染进程，告知是否保存成功
    event.reply('uploadAudioFileStatus', status)
})

function uploadAudioFile(sourcePath, fileName) {
    let destinationPath = path.join(audioFilesPath, fileName)
    fs.copyFile(sourcePath, destinationPath, (err) => {
        if(err) throw err
    })
}

ipcMain.on('getAudioFileList', (event, arg) => {
    // @done: 读取audio path下的文件列表
    fs.readdir(audioFilesPath, function(err, files) {
        event.returnValue = files
    })
})