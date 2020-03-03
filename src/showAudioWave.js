export default function showAudioWave(filename) {
    var audioWave = WaveSurfer.create({
        container: '#waveform'
    });
    audioWave.load(`../${filename}`);
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
