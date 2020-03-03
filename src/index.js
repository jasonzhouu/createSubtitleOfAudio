import TimeSlice from './TimeSlice.js'
import Table from './Table.js'
import addEventToButtons from './addEventToButtons.js'
import showAudioWave from './showAudioWave.js'

/*
* @public method: play(audioName)
*/
function AudioPage(audioName) {
    // 显示音频波
    const audioWave = showAudioWave(audioName + '.mp3')
    // 初始化分句数据
    let timeSlice = new TimeSlice(audioName)

    let table = new Table(audioWave, timeSlice)
    
    this.show = function() {
        // 显示表格
        table.show()
        // 给按钮添加事件
        addEventToButtons(audioWave, timeSlice, table)
    }

    this.destroy = function() {
        audioWave.destroy()
        table.clear()
    }
}

var audioPage = new AudioPage('xwz1')
audioPage.show()
