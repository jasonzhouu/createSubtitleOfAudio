let userDataPath

export default function showAudioWave(audioFileName) {
    var audioWave = WaveSurfer.create({
        container: '#waveform'
    });
    // @done: 从 user data path 读取音频文件
    // 1。获取user data path。
    // 方法：向主进程ipc请求
    getUserDataPath()
    // 2。与文件名拼接成完整文件路径
    // @todo: 由于操作系统的路径分隔符不同，后面改成向主进程请求文件完整路径
    let audioFilePath = `${userDataPath}/audioFiles/${audioFileName}` 
    audioWave.load(audioFilePath);
    /*
     * 订阅播放/暂停事件
     * 改变播放按钮的内容：播放时，显示暂停；暂停时，显示播放。
     */
    audioWave.on('pause', function () {
        $("#play").html("播放");
    });
    audioWave.on('play', function () {
        $("#play").html("暂停");
    });
    return audioWave;
}

function getUserDataPath(audioFileName) {
    userDataPath = ipcRenderer.sendSync('getUserDataPath')
}