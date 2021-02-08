const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(express.json());
app.use(cors());

const meubanco = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password:'',
    database: 'desafioreactdb'
});

app.post('/register', (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const cargo = req.body.cargo;
    const data_de_nascimento = req.body.data_de_nascimento;
    const salario = req.body.salario;

    meubanco.query('INSERT INTO funcionario (nome, sobrenome, cargo, data_de_nascimento, salario) VALUES (?,?,?,?,?)',
    [nome, sobrenome,cargo, data_de_nascimento, salario], (err, resultado) => {
        if(err){
            console.log(err)
        }else{
            res.send("CADASTRAMENTO FEITO COM SUCESSO")
        }
    })
});

app.get('/funcionarios', (req,res) => {
    meubanco.query("SELECT * FROM funcionario", (err, resultado) => {
        if(err){
            console.log(err)
        }else{
            res.send(resultado)
        }
    })
});

app.put('/update', (req, res) => {
    const nome = req.body.nome;
    const userId = req.body.userId;

    meubanco.query('UPDATE funcionario SET nome = ? WHERE idFuncionario = ?',[nome, userId],(err, resultado) => {
        if(err){
            console.log(err)
        }else{
            res.send(resultado)
        }
    })
});

app.delete('/delete:userId', (req, res) => {
    const userId = req.params.userId;

    meubanco.query('DELETE FROM funcionario WHERE idFuncionario = ?',[userId], (err, resultado) => {
        if(err) console.log(err);
    })
});

app.listen(3002, () => {
    console.log("PORT 3002")
});