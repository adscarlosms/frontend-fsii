import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';

export default function FormCadQuarto(props) {
    const [validado, setValidado] = useState(false);
    const [listaTipoQuarto, setListaTipoQuarto] = useState([{
        idtpquarto: 0,
        descricao: "Nenhum tipo de quarto Informado!"
    }]);

    const [quarto, setQuarto] = useState({
        codigo: "",
        numero: "",
        andar: "",
        status: "",
        tipoquarto: {}
    });

    function buscarTipoQuarto() {
        fetch("http://localhost:4000/tipoquarto", { method: "GET" })
            .then(response => response.json())
            .then(retorno => {

                if (retorno.status) {
                    setListaTipoQuarto(retorno.listatipoQuartos);
                }

            }).catch(erro => {
                setListaTipoQuarto([{
                    idtpquarto: 0,
                    descricao: "Erro ao buscar tipo de quarto. " + erro.message
                }])
            });

    }

    function selecionarTipoQuarto(evento) {
        const codigoTipoQuarto = evento.currentTarget.value;
        //verificar..
        setQuarto({ ...quarto, tipoquarto: { "idtpquarto": codigoTipoQuarto } });

    }


    function manipularMudanca(evento) {
        //extrair do evento onChange quem provocou a sua ocorrência
        const componente = evento.currentTarget;
        setQuarto({ ...quarto, [componente.name]: componente.value });
    }

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;
        if (form.checkValidity() === false) {
            setValidado(true);
        } else {
            setValidado(false);
            fetch("http://localhost:4000/quarto", {
                method: "POST",
                body: JSON.stringify(quarto),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(retorno => {
                    if (retorno.status) {
                        alert(retorno.mensagem + "- Código Gerado: " + retorno.codigoGerado);
                        atualizarListaQuartos();
                    }
                    else {
                        alert(retorno.mensagem);
                    }
                })
                .catch(erro => {
                    //Erro ao salvar o Quarto. props.setListaQuarto is not iterable
                    alert("Erro ao salvar o Quarto. " + erro.message);
                });
        }
    }

    function atualizarListaQuartos(){
        fetch("http://localhost:4000/quarto", { method: "GET" })
        .then(resposta => resposta.json())
        .then(retorno => {
            if (retorno.status) {
                props.setListaQuarto(retorno.listaquartos);
                props.setExibirTabela(true);
            } else {
                alert(retorno.mensagem);
            }
        })
        .catch(erro => {
            alert("Erro ao retornar a lista de quartos. " + erro.message);
        });
    }

    useEffect(() => {
        buscarTipoQuarto();
    }, []);


    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        value={quarto.codigo}
                        id="codigo"
                        name="codigo"
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do quarto.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="12">
                    <Form.Label>Número do Quarto</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Número do quarto"
                        value={quarto.numero}
                        id="numero"
                        name="numero"
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor,informe o número do quarto.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Andar:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="andar"
                        id="andar"
                        name="andar"
                        value={quarto.andar}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o Andar do quarto.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Status:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Disponível,Ocupado, Manutenção..."
                        id="status"
                        name="status"
                        value={quarto.status}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o status do Quarto.</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="5">
                    <Form.Label>Tipo do Quarto:</Form.Label>
                    <Form.Select id="idtpquarto"
                        name="idtpquarto"
                        onChange={selecionarTipoQuarto}>
                        <option key="0" value="0" >Escolha o Tipo de Quarto </option>
                        {
                            listaTipoQuarto.map((tipoquarto) => {
                                return (
                                    <option key={tipoquarto.idtpquarto}

                                        value={tipoquarto.idtpquarto}>{tipoquarto.descricao}

                                    </option>
                                );
                            })
                        }

                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Por favor, informe o tipo do Quarto.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Gravar</Button>
            {

            }
            <Button onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}