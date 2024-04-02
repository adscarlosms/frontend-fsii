import { Button, Table } from "react-bootstrap";
export default function TabelaQuartos(props) {
    return (
        <div>
            <Button onClick={() => {
                props.setExibirTabela(false);
            }}>
                Cadastrar Novo Quarto
            </Button>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nº do Quarto</th>
                        <th>Nº do Andar</th>
                        <th>Status</th>                     
                        <th>Tipo do Quarto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaQuarto?.map((quarto, index) => {
                            return (
                                <tr key={quarto.idquarto}>
                                    <td>{quarto.idquarto}</td>
                                    <td>{quarto.numero}</td>
                                    <td>{quarto.andar}</td>                                    
                                    <td>{quarto.status}</td>                                    
                                    <td>{quarto.tipoquarto.descricao}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
        </div>
    )
}