import FormCadQuarto from "../formularios/formCadQuarto";
import TabelaQuarto from "../tabelas/tabelaQuarto";
import Pagina from "../templates/pagina";
import { useState, useEffect } from "react";

export default function TelaCadastroQuarto(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
   
    const [listaQuarto, setListaQuarto] = useState([]);

    function buscarQuarto() {
        fetch("http://localhost:4000/quarto", { method: "GET" })
            .then(resposta => resposta.json())
            .then(retorno => {
                if(retorno.status){
                    setListaQuarto(retorno.listaquartos);                  
                }
                else{
                    alert(retorno.mensagem);
                }
            })
            .catch(erro => {
                alert("Erro ao retornar a lista de quartos. " + erro.message);
            })
    }


    useEffect(() => {
        buscarQuarto();
    },[]);//[listaQuarto]);


    if (exibirTabela) {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Quartos</h1>
                    <br/>
                    <h2>Lista de Quarto</h2>
                    <TabelaQuarto listaQuarto={listaQuarto} setExibirTabela={setExibirTabela} /> 
                   
                </Pagina>
            </div>
        )
    }
    else {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Quarto</h1>
                    <br/>
                    <h2>Formulário de cadastro de Quarto</h2>
                    <FormCadQuarto
                        setExibirTabela={setExibirTabela}
                        listaQuarto={listaQuarto}
                        setListaQuarto={setListaQuarto}
                     />
                </Pagina>
            </div>
        )
    }
}