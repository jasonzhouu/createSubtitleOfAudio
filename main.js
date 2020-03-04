const path = require('path')
const { app, BrowserWindow } = require('electron')

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