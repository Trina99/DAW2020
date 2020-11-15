var http = require('http')
var axios = require('axios');
const HTTP_HEADER={'Content-Type':'text/html;charset=utf-8;'};


exports.get_alunos = function(res, page=1, code=200)
{
    url = 'http://localhost:3002/alunos?_limit=30&_page='+page
    axios.get(url)
        .then(resp => {
            alunos = resp.data;
            res.writeHead(code, HTTP_HEADER)
            res.write('<h2>Escola de Música: Lista de Alunos</h2>')
            res.write('<ul>')
            alunos.forEach(a => {
                res.write('<li><b><a href="/alunos/'+a.id+'">'+ a.id + '</a></b>: '+ a.nome +'</li>')
            })
            res.write('</ul>')
            res.write('<address>[<a href="/alunos/page1">First</a>]</address>')
            if(page!= 1)
                res.write('<address>[<a href=/alunos/page' + (parseInt(page)-1) + '>Prev</a>]</address>')
            res.write('<address>[<a href="/">Voltar</a>]</address>')
            if(page != 13)
                res.write('<address>[<a href=/alunos/page'+ (parseInt(page)+1) +'>Next</a>]</address>')
            res.write('<address>[<a href="/alunos/page13">Last</a>]</address>')
            res.end()
        })
        .catch(error => {
            console.log(url)
            console.log("Erro na obtenção da lista de alunos: " + error);
        })
}

exports.get_cursos = function(res, code=200)
{
    axios.get('http://localhost:3002/cursos')
        .then(resp => {
            cursos = resp.data;
            res.writeHead(200, HTTP_HEADER)
            res.write('<h2>Escola de Música: Lista de Cursos</h2>')
            res.write('<ul>')
            cursos.forEach(c => {
                res.write('<li><b><a href="/cursos/'+c.id+'">'+ c.id + '</a></b>: '+ c.designacao +'</li>')
            })
            res.write('</ul>')
            res.write('<address>[<a href="/">Voltar</a>]</address>')
            res.end()
        })
        .catch(error => {
            console.log("Erro na obtenção da lista de cursos: " + error);
        })
}

exports.get_instrumentos = function(res, code=200){
    axios.get('http://localhost:3002/instrumentos')
    .then(resp => {
        instrumentos = resp.data;
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write('<h2>Escola de Música: Lista de Intrumentos</h2>')
        res.write('<ul>')
        instrumentos.forEach(i => {
            res.write('<li><b>'+ i.id + '</b>: '+ i['#text'] +'</li>')
        })
        res.write('</ul>')
        res.write('<address>[<a href="/">Voltar</a>]</address>')
        res.end()
    })
    .catch(error => {
        console.log("Erro na obtenção da lista de instrumentos: " + error);
    })
}

exports.get_aluno = function(res, id, code=200,){
    url='http://localhost:3002/alunos?id='+id
    console.log(url)
    axios.get(url)
    .then(resp => {
        aluno = resp.data;
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write('<h2>Escola de Música</h2>')
        res.write('<ul>')
        aluno.forEach(a =>{
            res.write('<li><b>Id:</b> '+a.id+'</li>')
            res.write('<li><b>Nome:</b> '+a.nome+'</li>')
            res.write('<li><b>Data de Nascimento:</b> '+a.dataNasc+'</li>')
            res.write('<li><b>Curso:</b> <a href="/cursos/'+a.curso+'">'+a.curso+'</a></li>')
            res.write('<li><b>Ano Curso:</b> '+a.anoCurso+'</li>')
            res.write('<li><b>Instumento:</b> '+a.instrumento+'</li>')
        })
        res.write('</ul>')
        res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
        res.end()
    })
    .catch(error => {
        console.log("Erro na obtenção do alunos: " + error);
    })
}

exports.get_curso = function(res, id, code=200,){
    url='http://localhost:3002/cursos?id='+id
    console.log(url)
    axios.get(url)
    .then(resp => {
        curso = resp.data;
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write('<h2>Escola de Música</h2>')
        res.write('<ul>')
        curso.forEach(c =>{
            res.write('<li><b>Id:</b> '+c.id+'</li>')
            res.write('<li><b>Designação:</b> '+c.designacao+'</li>')
            res.write('<li><b>Duração:</b> '+c.duracao+'</li>')
            res.write('<li><b>Instrumento:</b>' + c.instrumento['#text'])
        })
        res.write('</ul>')
        res.write('<address>[<a href="/cursos">Voltar</a>]</address>')
        res.end()
    })
    .catch(error => {
        console.log("Erro na obtenção da lista de alunos: " + error);
    })
}