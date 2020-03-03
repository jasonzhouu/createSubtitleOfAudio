import TimeSlice from './TimeSlice.js'
import Table from './Table.js'
import addEventToButtons from './addEventToButtons.js'
import showAudioWave from './showAudioWave.js'

/*
* @public method: play(audioName)
*/
function AudioPage(audioName) {
    var timeSlice = new TimeSlice(audioName)
    
    this.show = function() {
        const audioWave = showAudioWave(audioName + '1.mp3')
        var table = new Table(audioWave, timeSlice)
        table.show()
        
        addEventToButtons(audioWave, timeSlice, table)

    }
}

var audioPage = new AudioPage('xwz')
audioPage.show()