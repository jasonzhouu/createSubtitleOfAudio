import TimeSlice from './TimeSlice.js'
import Table from './Table.js'
import {addEventToButtons, clearEventToButtons} from './addEventToButtons.js'
import showAudioWave from './showAudioWave.js'

/*
* @public method: play(audioName)
*/
function AudioPage() {
    let audioWave = null
    let table = null

    this.show = function (audioName) {
        // 销毁之前的音频波，如果存在的话；清除按钮注册的事件。
        destroy()
        // 显示音频波
        audioWave = showAudioWave(audioName + '.mp3')

        // 初始化分句数据
        let timeSlice = new TimeSlice(audioName)

        // 显示表格
        table = new Table(audioWave, timeSlice)
        table.show()

        // 给按钮添加事件
        addEventToButtons(audioWave, timeSlice, table)
    }

    // 私有函数
    function destroy() {
        if (audioWave != null) {
            audioWave.destroy()
        }
        if(table != null) {
            table.clear()
        }

        clearEventToButtons()
    }
}

var audioPage = new AudioPage()
audioPage.show('xwz1')

setTimeout(() => {
    audioPage.show('xwz2')
}, 2000);