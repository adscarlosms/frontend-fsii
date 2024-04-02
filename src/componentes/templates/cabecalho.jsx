import { ContextoUsuario } from "../contexto/Contexto";
import { useContext } from "react";
import { Container } from "react-bootstrap";

export default function Cabecalho(props){
    const [usuario, setUsuario] = useContext(ContextoUsuario);
    return (
        <div>
             <Container className="w-100 bg-dark border d-flex justify-content-center align-content-center">
             <h1 className="text-light">{props?.texto}</h1>             
             </Container>
             <div className="justify-content-center align-items-center d-flex ">Usuário: {usuario?.nome}</div>
            
        </div>
    );
}