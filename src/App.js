import TelaCadastroCliente from "./componentes/telas/telaCadastroCliente";
import TelaMenu from './componentes/telas/telaMenu';
import Tela404 from "./componentes/telas/tela404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroQuarto from "./componentes/telas/telaCadastroQuarto";
import TelaLogin from "./componentes/telas/telaLogin";
import { useState } from "react";
import { ContextoUsuario } from "./componentes/contexto/Contexto";
import FormCadReserva from "./componentes/formularios/FormCadReserva";



function App() {
  const [usuario, setUsuario] = useState({
    nome: "",
    logado: false
  });

  if (!usuario.logado) {

    return <ContextoUsuario.Provider value={[usuario, setUsuario]}>
              <TelaLogin />;
            </ContextoUsuario.Provider>;
  }
  else {
    return (
      <div className="App">
        <ContextoUsuario.Provider value={[usuario, setUsuario]}>
          <BrowserRouter>
            <Routes>
              {
                //React Router DOM e seus componentes permitem associar rotas (urls) a componentes.
                //A ordem importa. A primeira rota definida tem prioridade. Depois a segunda ...
              }
              <Route path="/cliente" element={<TelaCadastroCliente />} />
              <Route path="/quarto" element={<TelaCadastroQuarto />} />
              <Route path="/" element={<TelaMenu />} />
              <Route path="reserva" element={<FormCadReserva />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </div>
    );
  }
}

export default App;
