import AudioPage from './AudioPage.js'


const audioPage = new AudioPage()


audioPage.show('xwz1')

// setTimeout(() => {
//     audioPage.show('xwz2')
// }, 2000);

$('#showAudioList').click(function() {
    $('#audioList').show()
    $('#audioPage').hide()
})
$('#closeAudioList').click(function() {
    $('#audioList').hide()
    $('#audioPage').show()
})

// 点击音频列表，播放相应的文件，并隐藏音频列表
$('#audioList ul li').click(function() {
    let index = ($('li').index($(this)) + 1)
    audioPage.show('xwz'+index)
    $('#audioList').hide()
    $('#audioPage').show()
    audioPage.play()
})

$('#audioList button#addAudio').click(function() {
    console.log('click');
    
})