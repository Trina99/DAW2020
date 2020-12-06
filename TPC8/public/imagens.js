function showImage(name, type, desc){
    if(type == 'image/png' || type == 'image/jpeg'){
        var fileObj = $(`
        <div class="w3-row w3-margin">
            <div class="w3-col s6">
                <img src="/fileStore/${name}" width="80%"/>
            </div>
            <div class="w3-col s6 w3-border">
                <p>Filename: ${name}</p>
                <p>Nametype: ${type}</p>
                <p>Description: ${desc}</p>
            </div>
        </div>
    `)
    }
    else
        var fileObj = $('<p>' + name + ', ' + type + '</p>')


    var download = $('<div><a href="/files/download/' + name + '">Download</a></div>"')
    $("#display").empty()
    $("#display").append(fileObj, download)
    $("#display").modal()
}