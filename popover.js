let option = {
    content: "",
    trigger: "hover",
    placement: "auto",
}

$("#audioController").popover({
    ...option,
    content: "暂停/开始",
})

$("#addSlice").popover({
    ...option,
    content: "添加新句子",
})

$("#saveToJsonFile").popover({
    ...option,
    content: "将字幕保存到JSON文件",
})