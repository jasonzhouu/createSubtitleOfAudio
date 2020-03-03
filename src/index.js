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
