import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Navbar from "./components/Navbar";
import CrearPublicaciones from "./pages/CrearPublicaciones";
import Perfil from "./pages/perfil";
import DetallePublicacion from "./pages/DetallePublicacion";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/crear" element={<CrearPublicaciones />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/publicacion/:id" element={<DetallePublicacion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
