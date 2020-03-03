export default function showAudioWave(filename) {
    var showAudioWave = WaveSurfer.create({
        container: '#waveform'
    });
    showAudioWave.load(`../${filename}`);
    showAudioWave.on('ready', function () {
        // 启动时自动播放
        // showAudioWave.play();
    });
    /*
     * 订阅播放/暂停事件
     * 改变播放按钮的内容：播放时，显示暂停；暂停时，显示播放。
     */
    showAudioWave.on('pause', function () {
        $("#play").html("播放");
    });
    showAudioWave.on('play', function () {
        $("#play").html("暂停");
    });
    return showAudioWave;
}
