import restoreFromElectronStore from './restoreFromElectronStore.js'

var timeSlice = new Proxy({
    data: [],
}, {
    get: function(target, prop, receiver) {
        switch (prop) {
            case 'currentSlice':
                return target[
                    target.length - 1
                ]
                break;
            case 'data':
                return target[data];
                break;
            default:
                break;
        }
    }
})

// 一个数组，保存着所有句子的数据
timeSlice.data = restoreFromElectronStore();

timeSlice.createNewSlice = function() {
    var newSlice = new Proxy({ // 如何监听 js 中变量的变化? https://www.zhihu.com/question/44724640/answer/117339055
        start: null,
        end: null,
        note: null
    }, {
        set: function(obj, prop, value) {
            if(prop == "start" || prop == "end") {
                if(typeof(value) == 'number') {
                    obj[prop] = value;
                }
            } else if (prop == "note") {
                obj[prop] = value;
            }
            disableNewRowButton()
            return true;
        }
    })
    this.data.push(newSlice)
    return true
}

export default timeSlice;