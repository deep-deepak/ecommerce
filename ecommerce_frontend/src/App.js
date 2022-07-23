/***
 * routing of all the components
 */

import React from "react";

import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import SellerRoute from "./routing/SellerRoute";
import AuthRoute from "./routing/AuthRoute";

import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Footer from "./components/Footer";
import Register from "./containers/Register/Register";
import About from "./containers/About/About";

import SellerHome from "./containers/seller/Home";
import SellerProducts from "./containers/seller/Product";
import AddProduct from "./containers/seller/Home/ManageProduct/AddProduct";
import PageNotFound from "./containers/PageNotFound";
import ProductsList from "./containers/seller/Product/ProductsList";

import store from "./redux/store";
import Cart from "./containers/AddCart";
import Contact from "./containers/Contactus/Index";
import Shipping from "./containers/shippingAddress";
import Payment from "./containers/payment";
import PlaceOrder from "./containers/placeorder";

import Order from "./containers/order/order";
import OrderList from "./containers/orderlist/OrderList";
import OrderListAdmin from "./containers/AdminOrders/adminOrders";
import SellerOrder from "./containers/seller/SellerOrders/ManageOrders";

import UserEditScreen from "./containers/AdminuserEdit/userEditScreen";
import UserList from "./containers/AdminuserList/userListScreen";

import ProductEditScreen from "./containers/AdminproductEdit/ProductEditScreen";
import ProductListScreen from "./containers/AdminproductList/ProductListScreen";
import adminSidebar from "./containers/adminHome/adminHome";
import AdminRoute from "./routing/AdminRoute";
import AdminHome from "./containers/adminHome/adminHome";
// import adminDashboard from "./containers/admin/admin";
// import { AdminRouter } from "react-admin";

// import { Admin, Resource } from "react-admin";
// import lb4Provider from "react-admin-lb4";

function App() {
  return (
    <Provider store={store}>
      <div>
        <div className="page-container">
          <div className="content-wrap">
            <BrowserRouter>
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/search" exact component={Home} />
                <Route path="/page" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/contactus" exact component={Contact} />
                <Route path="/cart/:id?" exact component={Cart} />
                <Route path="/shipping" exact component={Shipping} />
                <Route path="/payment" exact component={Payment} />
                <Route path="/placeorder" exact component={PlaceOrder} />
                <Route path="/order/:id?" exact component={Order} />
                <Route path="/orderlist" exact component={OrderList} />

                <AdminRoute path="/admin/userlist" component={UserList} />
                <AdminRoute
                  path="/admin/user/:id/edit"
                  component={UserEditScreen}
                />
                <AdminRoute
                  path="/admin/user/:id/edit"
                  component={UserEditScreen}
                />
                <AdminRoute
                  path="/admin/orderlist"
                  component={OrderListAdmin}
                />
                <AdminRoute path="/adminsidebar" exact component={AdminHome} />

                <AdminRoute
                  path="/adminorderpag"
                  exact
                  component={OrderListAdmin}
                />

                <AdminRoute
                  path="/admin/productlist"
                  component={ProductListScreen}
                />
                <AdminRoute
                  path="/admin/product/:id/edit"
                  component={ProductEditScreen}
                />

                {/* <Route path="/admin/orderlist" component={OrderListScreen} /> */}

                <AuthRoute path="/login" exact component={Login} />
                <AuthRoute path="/register" exact component={Register} />
                <SellerRoute
                  path="/seller/order"
                  exact
                  component={SellerOrder}
                />
                <SellerRoute path="/seller" exact component={SellerHome} />
                <SellerRoute
                  path="/seller/products"
                  exact
                  component={SellerProducts}
                />
                <SellerRoute
                  path="/seller/addproduct"
                  exact
                  component={AddProduct}
                />
                <SellerRoute
                  path="/seller/edit-productdetails/:id"
                  exact
                  component={AddProduct}
                />
                <SellerRoute
                  path="/seller/products/seller/delete-product"
                  exact
                  component={ProductsList}
                />

                <Route component={PageNotFound} />

                {/* <Route  path="/login" exact component={<AuthRoute>{Login}</AuthRoute>}/>
        <Route  path="/register"  exact component={<AuthRoute>{Register}</AuthRoute>}/>

        <Route path="/seller" exact component={<SellerRoute>{SellerHome}</SellerRoute>}/>
        <Route path="/seller/products"exact component={<SellerRoute>{SellerProducts}</SellerRoute>}/>
        <Route path="/seller/addproduct"exact component={<SellerRoute>{AddProduct}</SellerRoute>}/>
        <Route path="/seller/edit-productdetails/:id"exact component={<SellerRoute>{AddProduct}</SellerRoute>}/>
        <Route path="/seller/delete-product/:id"exact component={<SellerRoute>{ProductsList}</SellerRoute>}/> */}

                {/* <Route path="/seller/edit-product" element={<Sellerhomepage />}/>
        <Route path="/seller/products" element={<Sellerhomepage />}/> */}
              </Switch>

              <hr />
              <Footer />
            </BrowserRouter>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
