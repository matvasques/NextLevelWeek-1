const express = require("express")

//express retorna um obj
const server = express()

//importar o banco de dados
const db = require("./database/db.js")

//configurar pasta public. faz o server enxergar a pasta public como se estivesse no mesmo local que os views, para nao precisar alterar tds os src de css e scripts la configurados
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))


//utilizando o template nunjucks
const  nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noChace: true
})

//configurar os caminhos da app -get = rota
//rota index
server.get("/", (req, res) => {
    return res.render("index.html")
})

//rota create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
    
    //inserir dados no banco
    const query = `
        INSERT INTO places (
            name,
            image, 
            address, 
            address2, 
            state, 
            city,
            items
        )VALUES (?, ?, ?, ?, ?, ?, ?)`
    
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return res.render('create-point.html', {error: true})
        }

        return res.render('create-point.html', {saved: true, error: false})
    }

    db.run(query, values, afterInsertData)
})

//rota search-results
server.get("/search", (req, res) => {
    const search = req.query.search

    if(search === ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }
    
    //retornar os dados de acordo com a cidade
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows){
        if(err){

        }

        const total = rows.length
        return res.render("search-results.html", {places: rows, total: total})
    })
})

//nota __dirname variavel global do js que contem o end do diretorio em que 'voce' esta

//nota 2 por causa do nunchucks, removemos o __dirname por nao ser mais necessario passar o endereco dos html, uma vez que configuramos o nunchucks direto na pasta view. E a funcao utilizada agora na rota nao é mais a sendFiles e sim a render e ela tem a inteligencia para entender isso

//ligar(listen) o servidor, executando o metodo listen que recebe a porta por param
server.listen(3000)