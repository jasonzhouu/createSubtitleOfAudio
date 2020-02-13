const {app, BrowserWindow} = require('electron')
let win

app.on('ready', () => {
    win = new BrowserWindow({width: 1000, height: 800})
    win.loadFile('index.html')
})