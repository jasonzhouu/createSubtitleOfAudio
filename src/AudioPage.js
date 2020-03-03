import TimeSlice from './TimeSlice.js'
import Table from './Table.js'
import {addEventToButtons, clearEventToButtons} from './addEventToButtons.js'
import showAudioWave from './showAudioWave.js'

/*
 * @public method: show(audioName)
 * @private method: destroy() 将已有的页面清除
*/
export default function AudioPage() {
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

        clearEventToButtons()
    }
}
