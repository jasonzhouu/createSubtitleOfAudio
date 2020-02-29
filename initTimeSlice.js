import restoreFromElectronStore from './restoreFromElectronStore.js'

export default function initTimeSlice() {
    var timeSlice = new Proxy({
        data: [],
    }, {
        get: function (target, prop, receiver) {
            switch (prop) {
                case 'currentSlice':
                    return target[target.length - 1];
                case 'data':
                    return target.data;
                default:
                    break;
            }
        }
    });
    // 一个数组，保存着所有句子的数据
    timeSlice.data = restoreFromElectronStore();
    timeSlice.createNewSlice = function () {
        var newSlice = new Proxy({
            start: null,
            end: null,
            note: null
        }, {
            set: function (obj, prop, value) {
                if (prop == "start" || prop == "end") {
                    if (typeof (value) == 'number') {
                        obj[prop] = value;
                    }
                }
                else if (prop == "note") {
                    obj[prop] = value;
                }
                return true;
            }
        });
        this.data.push(newSlice);
        return true;
    };
    return timeSlice;
}

