import {wavesurfer, setAudioController} from './wavesurfer.js'
import {currentSlice} from './timeSlice.js'

$("#audioController").on("click", function () {
    wavesurfer.playPause()
    setAudioController()
})