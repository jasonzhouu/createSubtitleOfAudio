var wavesurfer = WaveSurfer.create({
    container: '#waveform'
});
wavesurfer.load('./xwz1.mp3');
wavesurfer.on('ready', function () {
    // wavesurfer.play();
    setAudioController();
});


/*
 * 改变播放按钮的内容：播放时，显示暂停；暂停时，显示播放。
 */ 
function setAudioController() {
    if (wavesurfer.isPlaying() == true) {
        $("#play").html("暂停")
    } else {
        $("#play").html("播放")
    }
}

// export default wavesurfer;
export {wavesurfer, setAudioController};
