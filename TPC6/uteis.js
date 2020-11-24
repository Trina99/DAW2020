var http = require('http')
var axios = require('axios')
var fs = require('fs')

var {parse} = require('querystring')

exports.recursoEstatico = recursoEstatico
exports.sirvoRecursoEstatico = sirvoRecursoEstatico
exports.geraConfirm = geraConfirm
exports.recuperaInfo = recuperaInfo
exports.geraMainPag = geraMainPag
// exports.geraPagTask = geraPagTask
exports.geraFormTask = geraFormTask
exports.geraEditTask = geraEditTask
exports.generateId = generateId

var fs = require('fs')

function generateId(tasks){
    var id = 0
    
    tasks.forEach(t => {
        if(t.id > id)
            id = t.id
    });

    id = Number(id) + 1
    return id;
}

function recursoEstatico(request){
    return /\/w3.css$/.test(request.url) || 
                /\/favicon.png$/.test(request.url) ||
                /\/student.png$/.test(request.url)
}


function sirvoRecursoEstatico(req, res){
    var partes = req.url.split('/')
    var file = partes[partes.length -1 ]
    fs.readFile('public/' + file, (erro, dados)=>{
        if(erro){
            console.log('Erro: ficheiro não encontrado ' + erro)
            res.statusCode = 404
            res.end()
        }
        else{
            if(file == '/favicon.ico')
                res.setHeader('Content-Type', 'image/x-icon')
            res.end(dados)
        }
    })
}

// Funções auxilidares
function geraConfirm(task, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${task.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Task Created/Edited${task.name}</h1>
            </header>

            <footer class="w3-container w3-teal">
                <address>Generated from gtasks::DAW2020 in ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// Template para a Página PRINCIPAL  ------------------
function geraMainPag(tasks, d){
    let pagHTML = `
      <html>
          <head>
              <title>ToDo List</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>ToDo List</h2>
              </div>
              <h2>Tasks to do</h2>
              <table class="w3-table w3-bordered">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Author</th>
                      <th>Register Date</th>
                      <th>Deadline</th>
                    </tr>
                      `
//   <th>Type</th>
      tasks.forEach(t => {
          if(t.type=="todo"){
            pagHTML += `
                <tr>
                    <td><a href="/list/edit/${t.id}">${t.id}</a></td>
                    <td>${t.name}</td>
                    <td>${t.description}</td>
                    <td>${t.author}</td>
                    <td>${t.register_date}</td>
                    <td>${t.deadline}</td>
                    </tr>
                    `
                    //   <td>${t.type}</td>
          }
      });
  
    pagHTML += `
          </table>
          <a href="/list/register">
            <button>Add Task</button>
          </a>
          <hr/>
          <h2>Finished tasks</h2>
          <table class="w3-table w3-bordered">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Author</th>
                <th>Register Date</th>
                <th>Deadline</th>
            </tr>
        `
        tasks.forEach(t => {
            if(t.type=="done"){
              pagHTML += `
                  <tr>
                      <td>${t.id}</td>
                      <td>${t.name}</td>
                      <td>${t.description}</td>
                      <td>${t.author}</td>
                      <td>${t.register_date}</td>
                      <td>${t.deadline}</td>
                      <td> <a href = list/delete/${t.id}> x </a></td>
                      </tr>
                      `
                      //   <td>${t.type}</td>
            }
        });

    pagHTML += `</table>
                <div class="w3-container w3-teal">
              <address>Generated from gtasks::DAW2020 in ${d} --------------</address>
          </div>        
      </body>
      </html>
    `
    return pagHTML
  }

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------

// Template para add task  ------------------
function geraFormTask ( d ){
    return `
    <html>
        <head>
            <title>ToDo List Add Task</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="../w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>ToDo List Add Task</h2>
            </div>

            <form class="w3-container" action="/list" method="POST">
                
                <label class="w3-text-teal"><b>Name</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="name">

                <label class="w3-text-teal"><b>Description</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="description">

                <label class="w3-text-teal"><b>Author</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="author">

                <label class="w3-text-teal"><b>Register Date</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="register_date">

                <label class="w3-text-teal"><b>Deadline</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="deadline">
            
                <label class="w3-text-teal"><b>Type</b></label>
                <select class="w3-select" name="type">
                    <option value="todo">todo</option>
                    <option value="done">done</option>
                </select>

                <input class="w3-btn w3-blue-grey" type="submit" value="Submit">
                <input class="w3-btn w3-blue-grey" type="reset" value="Reset"> 
          </form>

            <footer class="w3-container w3-teal">
            <address>Generated from gtasks::DAW2020 in ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </body>
    </html>
    `
}


// Template para edit task -------------------------------
function geraEditTask(t, d ){
    return `
    <html>
        <head>
            <title>Edit task: ${t.name}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="../w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Edit task: ${t.name}</h2>
            </div>

            <form class="w3-container" action="/list/${t.id}" method="POST">
                
                <label class="w3-text-teal"><b>Name</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="name" value="${t.name}">

                <label class="w3-text-teal"><b>Description</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="description" value="${t.description}">

                <label class="w3-text-teal"><b>Author</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="author" value="${t.author}">

                <label class="w3-text-teal"><b>Register Date</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="register_date" value="${t.register_date}">

                <label class="w3-text-teal"><b>Deadline</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="deadline" value="${t.deadline}">
            
                <label class="w3-text-teal"><b>Type</b></label>
                <select class="w3-select" name="type">
                    <option value="todo">todo</option>
                    <option value="done">done</option>
                </select>

                <input class="w3-btn w3-blue-grey" type="submit" value="Save changes">
                <input class="w3-btn w3-blue-grey" type="reset" value="Reset"> 
          
            <footer class="w3-container w3-teal">
            <address>Generated from gtasks::DAW2020 in ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </body>
    </html>
    `
}