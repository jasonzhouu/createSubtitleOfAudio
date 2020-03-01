var wavesurfer = WaveSurfer.create({
    container: '#waveform'
});
wavesurfer.load('../xwz1.mp3');
wavesurfer.on('ready', function () {
    // wavesurfer.play();
    setAudioController();
});


/*
 * 订阅播放/暂停事件
 * 改变播放按钮的内容：播放时，显示暂停；暂停时，显示播放。
 */ 
wavesurfer.on('pause', function () {
    $("#play").html("播放")
});
wavesurfer.on('play', function () {
    $("#play").html("暂停")
});


// export default wavesurfer;
export {wavesurfer, setAudioController};
