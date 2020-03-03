const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            // 参考 https://newsn.net/say/electron-require-not-defined.html
            // nodeIntegration: true,
            // 这样不安全，有可能会因为XSS攻击，使得用户的电脑受侵害。
            // 更安全的做法参考 https://github.com/electron/electron/issues/9920#issuecomment-575839738
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