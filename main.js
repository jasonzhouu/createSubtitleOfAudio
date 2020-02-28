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
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

// 接收渲染进程发来的数据
ipcMain.on('save-as-json-file', (event, arg) => {
    var status = saveJsonToFile(arg)
    if (status == undefined) {
        status = "success"
    } else {
        status = "failed"
    }
    // 返回消息给渲染进程，告知是否保存成功
    event.reply('save-file-finished', status)
})

function saveJsonToFile(data) {
    console.log(data);
    // 保存JSON格式的文件，需要先将对象转成JSON格式，使用函数JSON.stringify(data)。参考：
    // fs.writeFile(): https://mp.weixin.qq.com/s?src=11&timestamp=1582584858&ver=2179&signature=uOuh3gfkNBDT*Z7O1JwaaIB5YMc7wRcp-oPgsk-zC*ePU9I*BJ7bA5t1bkl14OawiGGigD1y*QjZF6k2SuwTAc4n9snuf5FLcc9pqXCA7E7uhV5Cma0l6E6vsI3Nc-*A&new=1
    fs.writeFile("xwz.json", JSON.stringify(data), (err) => {
        if (err) {
            // throw err;
            return 'failed'
        }
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
  })