import {wavesurfer, setAudioController} from './wavesurfer.js'

$("#play").on("click", function () {
    wavesurfer.playPause()
    setAudioController()
})

$("#forward").click(function() {
    wavesurfer.skip(5);
})

$("#backward").click(function() {
    wavesurfer.skip(-5);
})
