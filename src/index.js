import AudioPage from './AudioPage.js'


const audioPage = new AudioPage()


audioPage.show('xwz1')

$('#showAudioList').click(function () {
    $('#audioList').show()
    $('#audioPage').hide()
})
$('#closeAudioList').click(function () {
    $('#audioList').hide()
    $('#audioPage').show()
})

// 点击音频列表，播放相应的文件，并隐藏音频列表
$('#audioList ul li').click(function () {
    let index = ($('li').index($(this)) + 1)
    audioPage.show('xwz' + index)
    $('#audioList').hide()
    $('#audioPage').show()
    audioPage.play()
})

$('#audioList button#addAudio').click(function () {
    console.log('click');

})







$('#audioUploader').on('change', function() {
    const fileList = this.files;
    for (const file of fileList) {
        // electron 的渲染进程比浏览器的File API多了path属性，即文件的路径
        // https://www.electronjs.org/docs/api/file-object
        uploadAudioFile(file.path, file.name)
    }
})

function uploadAudioFile(sourcePath, fileName) {
    // 发送ipc消息
    ipcRenderer.send('uploadAudioFile', {
        sourcePath,
        fileName
    })
}

// 接收ipc消息
// 收到保存文件是否成功的消息，@done: 将文件添加到列表，调用下面的 getAudioFileList()
ipcRenderer.on('uploadAudioFileStatus', (event, arg) => {
    console.log("upload audio file: " + arg)
    getAudioFileList()
})






// @done: 只显示位于 user data 目录下的音频文件
// 1。读取 user data 目录下的音频文件列表
// 由于渲染进程无法读取文件系统，所以得通过ipc向主进程请求

function getAudioFileList() {
    let audioFileList = ipcRenderer.sendSync('getAudioFileList')
    console.log(audioFileList);
}

// 2。展示文件列表