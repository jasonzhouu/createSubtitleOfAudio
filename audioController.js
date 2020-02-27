import {wavesurfer, setAudioController} from './wavesurfer.js'

$("#audioController").on("click", function () {
    wavesurfer.playPause()
    setAudioController()
})