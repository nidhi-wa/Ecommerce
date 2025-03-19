
import { Routes, Route } from "react-router-dom";
// components
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
// usercomponents
import RoutesWithUserChatComponents from "./components/users/RoutesWithUserChatComponents";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import UserCartDetailsPage from "./pages/users/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/users/UserOrderDetailsPage";
import UserOrdersPage from "./pages/users/UserOrdersPage";
import UserProfilePage from "./pages/users/UserProfilePage";
// Admin pages
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatPage from "./pages/admin/AdminChatPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminOrederDetailsPage from "./pages/admin/AdminOrederDetailsPage";
import AdminProductPage from "./pages/admin/AdminProductPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import './App.css'
import ProductListPage from "./pages/ProductListPage";
import ScrollToTop from "./utils/ScrollToTop";

function App() {

  return (
    <>
       <ScrollToTop />
      <HeaderComponent/>
      <Routes>
        <Route element={<RoutesWithUserChatComponents/>}>
           {/* Publicly avilable pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-detail" element={<ProductDetail/>} />
          <Route path="/product-list" element={<ProductListPage/>} />
        </Route>
        {/* User pages*/}
        <Route element={<ProtectedRoutesComponent admin={false}/>}>
          <Route path="/user/cart-details" element={<UserCartDetailsPage/>} />
          <Route path="/user/my-order" element={<UserOrdersPage/>} />
          <Route path="/user/order-details" element={<UserOrderDetailsPage/>} />
          <Route path="/user" element={<UserProfilePage/>} />
        </Route>
        
        {/* AdminPages */}
        <Route element={<ProtectedRoutesComponent admin={true}/>}>
          <Route path="/admin/users" element={<AdminUserPage/>} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage/>} />
          <Route path="/admin/admin-analytics" element={<AdminAnalyticsPage/>} />
          <Route path="/admin/admin-create-product" element={<AdminCreateProductPage/>} />
          <Route path="/admin/admin-order-details" element={<AdminOrederDetailsPage/>} />
          <Route path="/admin/admin-product" element={<AdminProductPage/>} />
          <Route path="/admin/admin-Chat" element={<AdminChatPage/>} />
        </Route>

        <Route path="*" element="Page Does Not Exist 404" />
      </Routes>
    <FooterComponent/>
      
    </>
  )
}

export default App
