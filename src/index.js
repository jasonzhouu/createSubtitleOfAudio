import TimeSlice from './TimeSlice.js'
import Table from './Table.js'
import addEventToButtons from './addEventToButtons.js'
import showAudioWave from './showAudioWave.js'

/*
* @public method: play(audioName)
*/
function AudioPage() {
    
    this.show = function(audioName) {
        const audioWave = showAudioWave(audioName + '1.mp3')
        var timeSlice = new TimeSlice(audioName)
        var table = new Table(audioWave, timeSlice)
        table.show()
        
        addEventToButtons(audioWave, timeSlice)

    }
}

var audioPage = new AudioPage()
audioPage.show('xwz')