import React, {useState} from 'react'
import './Estilos.css'
import Axios from 'axios';

export default function Cadastro() {
    const [nome, setNome] = useState();
    const [sobrenome, setSobrenome] = useState();
    const [cargo, setCargo] = useState();
    const [data_de_nascimento, setData_de_nascimento] = useState();
    const [salario, setSalario] = useState();
    const [userId, setUserId] = useState();
    const [userLista, setUserLista] = useState([]);

    const cadastrar_usuario = () => {
        Axios.post('http://localhost:3002/register', {
            nome: nome,
            sobrenome:sobrenome,
            cargo:cargo,
            data_de_nascimento:data_de_nascimento,
            salario:salario
        }).then(() => {
            console.log("Dados inseridos");
        })
    };

    const mostrar_dados = () => {
        Axios.get('http://localhost:3002/funcionarios').then((response) => {
            setUserLista(response.data)
        })
    };

    const updateUser = () => {
        Axios.put('http://localhost:3002/update',{userId:userId, nome:nome}).then(() => {
            console.log("Alterações feitas");
        })
    }

    const deletar_usuário = () => {
        Axios.delete(`http://localhost:3002/delete${userId}`,{userId:userId});
            console.log("Id " + userId + "deletado");
    }
    
    return (
        <div className="tela_cadastro">
        <h1>Sistema de cadastro <span>Desafio</span></h1>
            <div className="tela_principal">
                <div className="side_box tela_left">
                    <button onClick={mostrar_dados}>mostrar</button>
                    {userLista.map((val, key) => {
                        return <div className="tela_de_dados">
                            <h3>Nome: {val.nome}</h3>
                            <h3>Sobrenome: {val.sobrenome}</h3>
                            <h3>Cargo: {val.cargo}</h3>
                            <h3>Aniversário: {val.data_de_nascimento}</h3>
                            <h3>Salário: {val.salario}</h3>
                        </div>
                    })}

                    <form className="form_tela_left">
                        <fieldset><legend>Alter dado de usuário</legend>
                            <input type="number" placeholder="Id do usuário" onChange={(e) => {setUserId(e.target.value)}}/>
                            <input type="text" placeholder="Nome" onChange={(e) => {setNome(e.target.value)}}/>

                            <button onClick={updateUser}>Salvar</button>
                        </fieldset>
                    </form>
                </div>

                <div className="side_box tela_right">
                    <form>
                        <fieldset><legend>Cadastrar usuário</legend>
                            <input type="text" placeholder="Nome" onChange={(e) => {setNome(e.target.value)}}/>
                            <input type="text" placeholder="Sobrenome" onChange={(e) => {setSobrenome(e.target.value)}}/>
                            <input type="text" placeholder="Cago" onChange={(e) => {setCargo(e.target.value)}}/>
                            <input type="text" placeholder="Data de nascimento" onChange={(e) => {setData_de_nascimento(e.target.value)}}/>
                            <input type="number" placeholder="Salário" onChange={(e) => {setSalario(e.target.value)}}/>
                            <button onClick={cadastrar_usuario}>Cadastrar</button>
                        </fieldset>

                        <fieldset><legend>Deletar usuário</legend>
                            <input type="number" placeholder="Id do usuário" onChange={(e) => {setUserId(e.target.value)}}/>
                            <button onClick={ () => {deletar_usuário(userId)}}>Deletar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}
