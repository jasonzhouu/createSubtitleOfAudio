# 用来做什么的？
用来生成英语音频的字幕

# 为什么做这个？
听英语材料可以练习听力，现有的听力软件，都是将字幕全部展示出来。
但是我想用[shadow practice](https://www.zhihu.com/question/24706380/answer/387403508)方法练习，字幕不应该提前显示，而是在反复听几遍之后显示。如果提前知道字幕，会影响听力练习效果。这个方法要求将听力材料分句，每个句子包含句子开始时间、结束时间、字幕。
我在网上没有找到配套有分句数据的英语音频材料，只要整篇文章的mp3及其字幕。所以我就想自己写一个软件，进行分句。

# 怎么用？
播放音频，在句子开头和结尾，分别点击按钮记录时间，并将字幕粘贴进来。
整篇文章播放完之后，将字幕数据导出，使用JSON格式。