import React, { useState, useRef, useEffect } from "react";
import axios from "axios";



export default function ServiceScreen() {
    const [lista, setLista] = useState([]);
    const [nome, setNome] = useState([]);
    const [sobrenome, setSobrenome] = useState([]);
    const [email, setEmail] = useState([]);

    // useEffect(() => {
    //     buscarPessoa();
    // }, [] // Pra falar que é pra chamar quando iniciar o componente
    // )


    async function buscarPessoa() {
        const res = await axios.get('http://localhost:8080/pessoas')
        setLista(res.data);
        console.log(res.data);
    }



    async function setPessoa() {
        const pessoa = {
            nome,
            sobrenome,
            email
        }
        await axios.post('http://localhost:8080/pessoa', pessoa);

        buscarPessoa();
    }

    async function deletePessoa(id) {

        await axios.delete(`http://localhost:8080/pessoa/${id}`);

        buscarPessoa();
    }



    return (
        <div>

            <input placeholder="Nome:" type="text" name="nome" value={nome} onChange={(e) => { setNome(e.target.value) }} /><br />

            <input placeholder="Sobrenome:" type="text" name="sobrenome" value={sobrenome} onChange={(e) => { setSobrenome(e.target.value) }} /><br />
            <input placeholder="email:" type="email" name="email_usuario" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
            <button onClick={(setPessoa)}>enviar</button>

            <h1>Cadastro de Serviços</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            Excluir
                        </th>
                        <th>
                            Nome
                        </th>
                        <th>
                            Sobrenome
                        </th>
                        <th>
                            EMAIL
                        </th>
                    </tr>


                </thead>
                <tbody>
                    {lista.map((item, index) => (<tr key={index}>
                        <td>
                            <button onClick={() => deletePessoa(item.id)}>Excluir</button>
                        </td>
                        <td>
                            {item.nome}
                        </td>
                        <td>
                            {item.sobrenome}
                        </td>
                        <td>
                            {item.email}
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}
