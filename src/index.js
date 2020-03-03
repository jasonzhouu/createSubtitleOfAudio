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
        // 显示音频波
        const audioWave = showAudioWave(audioName + '1.mp3')

        // 显示表格
        var table = new Table(audioWave, timeSlice)
        table.show()
        
        // 给按钮添加事件
        addEventToButtons(audioWave, timeSlice, table)

    }
}

var audioPage = new AudioPage('xwz')
audioPage.show()