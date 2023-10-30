import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Pages/Login";
import HomePage from "./Pages/Home";
import { UserProvider } from "./context/userContext";
import { MenuProvider } from "./context/menuContext";
import { OrdersProvider } from "./context/ordersContext";
import MenuPage from "./Pages/Menu";
import PedidosPage from "./Pages/Pedidos";
import MenuAdminPage from "./Pages/Admin/MenuAdmin";
import PedidosAdminPage from "./Pages/Admin/PedidosAdmin";
import UserAdminPage from "./Pages/Admin/UserAdmin";
import ProtectedRoute2 from "./ProtectedRoute2";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  

  return (
    <>
    <OrdersProvider>
    <MenuProvider>
    <UserProvider>
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/menu" element={<MenuPage />}/>
        <Route path="/pedidos" element={<PedidosPage/>}/>
        <Route element={<ProtectedRoute2 />}>
        <Route path="/adminMenu" element={<MenuAdminPage/>}/>
        <Route path="/adminPedidos" element={<PedidosAdminPage/>}/>
        <Route path="/adminUsuarios" element={<UserAdminPage/>}/>
        </Route>
        </Route>
      </Routes>
      </Router>
      </UserProvider>
      </MenuProvider>
      </OrdersProvider>
      <ToastContainer />
    </>
  )
}

export default App
