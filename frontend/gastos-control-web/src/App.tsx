import PessoasPage from "./pages/Pessoas/PessoasPage"
import CategoriaPage from "./pages/Categoria/CategoriaPage";
import TransacaoPage from "./pages/Transacao/TransacaoPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <BrowserRouter>
      <div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">

            <Link className="navbar-brand" to="/">
              Controle de Gastos
            </Link>

            <Link className="nav-link" to="/pessoas">
              Pessoas
            </Link>
            <Link className="nav-link" to="/categoria">
              Categorias
            </Link>
            <Link className="nav-link" to="/transacao">
              Transações
            </Link>

          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/pessoas" element={<PessoasPage />} />
            <Route path="/categoria" element={<CategoriaPage />} />
            <Route path="/transacao" element={<TransacaoPage />} />
          </Routes>
        </main>

        {/* bem vindo */}
        
      </div>
    </BrowserRouter>
  )
}

export default App;
