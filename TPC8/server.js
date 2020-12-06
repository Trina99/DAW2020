var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')

const { dirname } = require('path')

var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))

//parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// GET
app.get('/', (req,res) => {
    var d = new Date().toISOString().substr(0,16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload', (req,res) => {
    var d = new Date().toISOString().substr(0,16)
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req,res) => {
    res.download(__dirname + '/public/fileStore/' + req.params.fname)
})

// POST
app.post('/files', upload.array('myFile'), (req,res) => {
    
    for(var i = 0; i<req.files.length; i++){
        let oldPath = __dirname + '/' + req.files[i].path
        let newPath = __dirname + '/public/fileStore/' + req.files[i].originalname 
        fs.rename(oldPath, newPath, function(err){
            if(err) throw err 
        })

        var d = new Date().toISOString().substr(0,16)
        var files = jsonfile.readFileSync('./dbFiles.json')
        files.push(
            {
                date: d,
                name: req.files[i].originalname,
                size: req.files[i].size,
                mimetype: req.files[i].mimetype,
                description: req.body.desc[i]
            }
        )
        jsonfile.writeFileSync('./dbFiles.json', files)
    }
    res.redirect('/')
})

app.listen(7704, () =>{
    console.log('Servidor à escuta na porta 7704 ...')
})