import Cabecalho from "./cabecalho";
import Menu from "./menu";

export default function Pagina(props) {
    return (
        <div>
            <Cabecalho texto="Gerenciamento de Hotel" />
            <Menu />
            <div className="container">
                {props.children}
            </div>
           
        </div>
    )
}