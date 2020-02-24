const { app, BrowserWindow, ipcMain } = require('electron')
let win

app.on('ready', () => {
    win = new BrowserWindow({
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
    win.loadFile('index.html')
})

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
})
