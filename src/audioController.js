import {wavesurfer} from './wavesurfer.js'

$("#play").on("click", function () {
    wavesurfer.playPause()
})

$("#forward").click(function() {
    wavesurfer.skip(5);
})

$("#backward").click(function() {
    wavesurfer.skip(-5);
})
