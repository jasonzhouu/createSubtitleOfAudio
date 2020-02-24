const { app, BrowserWindow } = require('electron')
let win

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true, // 参考 https://newsn.net/say/electron-require-not-defined.html
        }
    })
    win.loadFile('index.html')
})