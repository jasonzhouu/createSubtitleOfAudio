import AudioPage from './AudioPage.js'


const audioPage = new AudioPage()
var audioFileList 

// 启动时，展示音频文件列表
getAudioFileList()
showAudioList()

// 切换显示音频列表
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
    // @done: 获取音频文件名。2种方法：
    // √ 1。从DOM中读取
    //   2。先获得DOM的序号，然后从audioFileList数组中读取
    let audioFileName = $(this).html()
    audioPage.show(audioFileName)
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
    showAudioList()
})






// @done: 只显示位于 user data 目录下的音频文件
// 1。读取 user data 目录下的音频文件列表
// 由于渲染进程无法读取文件系统，所以得通过ipc向主进程请求

function getAudioFileList() {
    audioFileList = ipcRenderer.sendSync('getAudioFileList')
}

// 2。展示文件列表
function showAudioList() {
    // 先要清理，否则后续运行时，将在原有的基础上新添
    $('#audioList ul').html('')
    for(var audioFileName of audioFileList) {
        $('#audioList ul').append(
            $('<li></li>').html(audioFileName)
        )
    }
}