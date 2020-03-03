import AudioPage from './AudioPage.js'


const audioPage = new AudioPage()


audioPage.show('xwz1')

setTimeout(() => {
    audioPage.show('xwz2')
}, 2000);