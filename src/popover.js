let option = {
    content: "",
    trigger: "hover",
    placement: "auto",
}

export default function addPopOver() {
    $("#saveToJsonFile").popover({
        ...option,
        content: "将字幕保存到JSON文件",
    })
}
