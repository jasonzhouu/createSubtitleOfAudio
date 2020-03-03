export default function createWaveSurfer(filename) {
    var wavesurfer = WaveSurfer.create({
        container: '#waveform'
    });
    wavesurfer.load(`../${filename}`);
    wavesurfer.on('ready', function () {
        // 启动时自动播放
        // wavesurfer.play();
    });
    /*
     * 订阅播放/暂停事件
     * 改变播放按钮的内容：播放时，显示暂停；暂停时，显示播放。
     */
    wavesurfer.on('pause', function () {
        $("#play").html("播放");
    });
    wavesurfer.on('play', function () {
        $("#play").html("暂停");
    });
    return wavesurfer;
}
