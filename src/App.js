import {ToastContainer} from "react-toastify";

import {Route, Routes} from "react-router-dom";
import SignPage from "./Pages/auth/SignPage";
import NavBar from "./Pages/NavBar";
import Login from "./Pages/auth/Login";
import Footer from "./Pages/footer";
import HomePage from "./Pages/HomePage/HomePage";
import NotFound from "./component/notFound";
import ShopPage from "./Pages/ShopPage";
import ProductDetails from "./Pages/ProductDetails";
import PrivateRoute from "./component/routes/PrivateRoute";
import UserDashBoard from "./Pages/UserDashboard/UserDashBoard";
import AdminRoute from "./component/routes/AdminRoute";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import ProductList from "./Pages/AdminDashboard/ProductList"
import EditProduct from "./Pages/AdminDashboard/EditProduct";
import CreateProduct from "./Pages/AdminDashboard/CreateProduct";
import {useLoading} from "./hooks/loading";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/UserDashboard/PlaceOrder";
import MyOrder from "./Pages/UserDashboard/MyOrder";


function App() {
    const [isLoading,toggleLoading]=useLoading()
  return (
      <NavBar>

      <Routes>
          <Route path={'/'} element={<HomePage/>}></Route>
          <Route path='/signup' element={<SignPage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/shop' element={<ShopPage/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/product/:slug' element={<ProductDetails/>}></Route>
          {/*user protected route*/}
          <Route path={'dashboard'} element={<PrivateRoute/>}>
              <Route path={'user'} element={<UserDashBoard/>}>
                    <Route path={''} element={<MyOrder/>}></Route>
              </Route>
              <Route path={'place-order'} element={<PlaceOrder/>}></Route>
          </Route>

          {/*admin dashboard*/}
          <Route path={'/dashboard'} element={<AdminRoute/>} >
              <Route path={'admin'} element={<AdminDashboard/>}>
                  <Route path={''} element={<ProductList/>}></Route>
                  <Route path={':slug'} element={<EditProduct/>}></Route>
                  <Route path={'create-product'} element={<CreateProduct/>}></Route>
              </Route>
          </Route>
          <Route path={'*'} element={<NotFound/>}></Route>
      </Routes>
          {isLoading === false ?  <Footer/> : ""}
      </NavBar>
  );
}

export default App;
