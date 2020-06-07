//importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o obj que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utilizar o objeto de banco de dado p/ nossas operações

/*
db.serialize( () => {
    //criar uma tabela - usando `` só para poder quebrar a linha
    //comados SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id integer not null primary key autoincrement,
            name text,
            image text,
            address text,
            address2 text,
            state text,
            city text,
            items text

        );
    `)

    //inserir dados na tabela
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
        "Paperside",
        "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
        }

        console.log('Cadastrado com sucesso')
        console.log(this)
    }

    //db.run(query, values, afterInsertData)

    //consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            console.log(err)
        }

        console.log('Aqui estao seus registros')
        console.log(rows)
    })

    /* DELETANDO DA TABELA 
    [] = numero do registro
    db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
        if(err){
            console.log(err)
        }

        console.log('Registro deletado com sucesso')
    })
    

})*/
