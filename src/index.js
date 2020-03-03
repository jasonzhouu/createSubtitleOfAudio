import TimeSlice from './TimeSlice.js'
import Table from './Table.js'
import disableNewRowButton from './disableAddNewRow.js'
import addAudioController from './audioController.js'
import addPopOver from './popover.js'
import showAudioWave from './showAudioWave.js'

/*
* @public method: play(audioName)
*/
function AudioPage() {
    
    this.show = function(audioName) {
        const audioWave = showAudioWave(audioName + '1.mp3')
        var timeSlice = new TimeSlice(audioName)
        var table = new Table(audioWave, timeSlice)
        table.init()
        
        addAudioController(audioWave)
        addPopOver()
        
        // add new row
        $('#addSlice').click(function() {
            timeSlice.addNewSlice()
            table.refresh()
            disableNewRowButton(timeSlice.getLastSlice())
        })
    }
}

var audioPage = new AudioPage()
audioPage.show('xwz')