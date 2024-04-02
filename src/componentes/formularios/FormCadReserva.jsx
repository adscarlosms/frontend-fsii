import { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button, Container, InputGroup } from 'react-bootstrap';
import BarraBusca from "../components/BarraBusca";
import CaixaSelecao from "../components/CaixaSelecao";
import TabelaClienteReserva from "../tabelas/TabelaClienteReserva";
import Pagina from "../templates/pagina";

export default function FormCadReserva(props) {
    const [validado, setValidado] = useState(false);
    const [listaClientes, setListaClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [quartoSelecionado, setQuartoSelecionado] = useState({});

    const data_inicio = useRef("");
    const data_fim = useRef("");


    const [reserva, setReserva] = useState({
        cliente: "",
        data_inicio: "",
        data_fim: "",
        quartosReservados: []
    });

    useEffect(() => {
        fetch('http://localhost:4000/cliente', { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            })
            .then((listaClientes) => {
                setListaClientes(listaClientes.listaclientes);
            })
            .catch((erro) => {
                alert("Não foi possível recuperar os clientes do backend.");
            });
    }, []);


    /*function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {

            setReserva({ ...reserva, [alvo]: e.target.checked });
        }
        else {

            setReserva({ ...reserva, [alvo]: e.target.value });
        }
    }*/

    function gravarReserva() {
        fetch('http://localhost:4000/reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cliente: {
                    codigo: clienteSelecionado?.codigo
                },
                data_inicio: data_inicio.current.value,
                data_fim: data_fim.current.value,
                quartosReservados: reserva.quartosReservados
            })
        })
            .then((resposta) => {
                return resposta.json()
            })
            .then((dados) => {
                if (dados.status) {
                    setReserva({ ...reserva, id: dados.codigo })
                }
                alert(dados.mensagem);
            })
            .catch(erro => alert(erro.message));
    }

    const manipulaSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidado(false);
            gravarReserva();
        }
        else {
            setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();


    };

    return (
        <div>
            <Pagina>
                <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>

                    <Row className='mt-2 mb-2'>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Cliente</Form.Label>
                                <InputGroup hasValidation>
                                    <BarraBusca placeHolder={'Busque pelo nome do cliente'}
                                        dados={listaClientes}
                                        campoChave={"codigo"}
                                        campoBusca={"nome"}
                                        funcaoSelecao={setClienteSelecionado}
                                        valor={""}
                                        required />
                                </InputGroup>
                                <Form.Control.Feedback type="invalid">
                                    Informe o nome do Cliente
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3 mt-4">
                        <Form.Group as={Col} md="3" controlId="datainicio">
                            <Form.Label>Check-in</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                name="datainicio"
                                ref={data_inicio}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor informe a data prevista para o checkin.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="datafim">
                            <Form.Label>Check-out</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                name="datafim"
                                ref={data_fim}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor informe a data prevista para o checkout.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>

                    <Row>

                        <Container className="border">
                            <Row className="mb-5">
                                <Col md={2}>
                                    <Form.Label>Selecione um Quarto:</Form.Label>
                                </Col>
                                <Col>
                                    <CaixaSelecao enderecoFonteDados={"http://localhost:4000/quarto"}
                                        campoChave={"idquarto"}
                                        campoExibicao={"numero"}
                                        funcaoSelecao={setQuartoSelecionado}
                                        localLista={'listaquartos'} />
                                </Col>
                            </Row>
                            <Row>
                    
                            
      
                                <Col md={10}>
                                    <Row>
                                        <Col md={1}>
                                            <Form.Group>
                                                <Form.Label>Quarto</Form.Label>
                                                <Form.Control type="text" value={quartoSelecionado?.idquarto} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Nº Quarto</Form.Label>
                                                <Form.Control type="text" value={quartoSelecionado?.numero} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group>
                                                <Form.Label>Andar</Form.Label>
                                                <Form.Control type="text" value={quartoSelecionado?.andar} disabled />
                                            </Form.Group>
                                        </Col>

                                        <Col md={2}>
                                            <Form.Group>
                                                <Form.Label>Tipo do Quarto</Form.Label>
                                                <Form.Control type="text" value={quartoSelecionado?.tipoquarto?.descricao} disabled />
                                            </Form.Group>
                                        </Col>

                                        <Col md={1} className="middle">
                                            <Form.Group>
                                                <Form.Label>Adicionar</Form.Label>
                                                <Button onClick={() => {
                                                    //adicionar o item na lista de itens vendidos
                                                    setReserva({
                                                        ...reserva,
                                                        quartosReservados: [...reserva.quartosReservados, {
                                                            quarto: {
                                                                quarto_codigo: quartoSelecionado?.idquarto,
                                                                numero: quartoSelecionado?.numero,
                                                                andar: quartoSelecionado?.andar,
                                                                status: quartoSelecionado?.status,
                                                                tipoquarto: quartoSelecionado?.tipoquarto
                                                            }
                                                        }]
                                                    })
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-bag-plus-fill"
                                                        viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                                    </svg>
                                                </Button>
                                            </Form.Group>
                                            
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                           
                            <Row className="mt-3">
                                <p><strong>Sua lista de quartos escolhidos:</strong></p>
                                <TabelaClienteReserva
                                    listaItens={reserva.quartosReservados}
                                    setReserva={setReserva}
                                    dadosReserva={reserva} />
                            </Row>
                        </Container>
                    </Row>
                    <Button type="submit" className="mb-1">Gravar Reserva</Button>
                </Form>

            </Pagina>
        </div>
    );
}