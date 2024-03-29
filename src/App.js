import React, { Component } from 'react';
import './App.css';
import Login from './auth/login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Product from './inventory/Products'
import BarCodeExample from './orders/barcode';

import Orders from './orders/orders';
import TabExampleLoading from './catalogs/Catalogs';
import DashboardAdmin from './dashboard/dashboard';
import ProductDetails from './inventory/Products/ProductDetailsview';
import addProduct from './inventory/Products/addProduct';
import OrderPrint from './orders/order-print';
import InvoiceSmallPrint from './orders/order-small-print';

import transcation from './transcation/index';
import TranscationDetails from './transcation/transcationDetails';
import OrderThanks from './orders/thanks';
import Logout from './auth/logout';
import PublicRoute from './routes/PublicRoutes';
import PrivateRoute from './routes/PrivateRoutes';
import NoMatch from './pages/404';
import CustomersListPage from './customer/index';
import CustomerDetailsPage from './customer/cutomerDetails'
import colorsPage from './settings/colors';
import other from './settings/other';
import SizeFunction from './settings/sizes';
import types from './settings/types';
import SuppliePage from './catalogs/Supplier';
import CategoryPage from './catalogs/Category';
import BrandPage from './catalogs/brand';
import LengthPage from './settings/length';
import addColors from './settings/colors/addColors';
import colorDetails from './settings/colors/colorDetails';
import addSize from './settings/sizes/addSize';
import sizeDetails from './settings/sizes/sizeDetails';
import addType from './settings/types/addType';
import typeDetails from './settings/types/typeDetails';
import addLength from './settings/length/addLength';
import lengthDetails from './settings/length/lengthDetails';
import otherDetails from './settings/other/otherDetails';
import addOther from './settings/other/addOther';
import addSupplier from './catalogs/Supplier/addSupplier';
import SupplierDetails from './catalogs/Supplier/SupplierDetails';
import addCategory from './catalogs/Category/addCategory';
import CategoryDetails from './catalogs/Category/CategoryDetails';
import addBrand from './catalogs/brand/addBrand';
import brandDetails from './catalogs/brand/brandDetails';



class App extends Component {

  
  render() {
    console.log("Host URL" + process.env.PUBLIC_URL);
    return (
      <Router basename={process.env.PUBLIC_URL}>

        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/login" />
          )} />
           <Route exact path="/catalog" render={() => (
            <Redirect to="/category" />
          )} />
          <Route exact path="/setting" render={() => (
            <Redirect to="/colors" />
          )} />
          
          <Route exact path='/login' component={Login} />
          <PublicRoute restricted={true} exact path='/login' component={Login} />
          <PrivateRoute exact path='/product' component={Product} />
          <PrivateRoute exact path='/product/:id' component={ProductDetails} />
          <PrivateRoute exact path='/add-product' component={addProduct} />
          <PrivateRoute exact path='/reader' component={BarCodeExample} />
          <PrivateRoute exact path='/catalog' component={TabExampleLoading} />
          <PrivateRoute exact path='/dashboard' component={DashboardAdmin} />


          <PrivateRoute exact path='/order' component={Orders} />
          <PrivateRoute exact path='/order/print/:orderId' component={OrderPrint} />
          <PrivateRoute exact path='/order/print2/:orderId' component={InvoiceSmallPrint} />
          <PrivateRoute exact path='/order/thanks' component={OrderThanks} />

          <PrivateRoute exact path='/customer' component={CustomersListPage} />
          <PrivateRoute exact path='/customer/:id' component={CustomerDetailsPage} />

          <PrivateRoute exact path='/colors' component={colorsPage} />
          <PrivateRoute exact path='/colors/add' component={addColors} />
          <PrivateRoute exact path='/colors/:id' component={colorDetails} />

          <PrivateRoute exact path='/sizes' component={SizeFunction} />
          <PrivateRoute exact path='/sizes/add' component={addSize} />
          <PrivateRoute exact path='/sizes/:id' component={sizeDetails} />

          <PrivateRoute exact path='/types' component={types} />
          <PrivateRoute exact path='/types/add' component={addType} />
          <PrivateRoute exact path='/types/:id' component={typeDetails} />

          <PrivateRoute exact path='/length' component={LengthPage} />
          <PrivateRoute exact path='/length/add' component={addLength} />
          <PrivateRoute exact path='/length/:id' component={lengthDetails} />
          
          <PrivateRoute exact path='/others' component={other} />
          <PrivateRoute exact path='/others/add' component={addOther} />
          <PrivateRoute exact path='/others/:id' component={otherDetails} />
         
          <PrivateRoute exact path='/supplier' component={SuppliePage} />
          <PrivateRoute exact path='/supplier/add' component={addSupplier} />
          <PrivateRoute exact path='/supplier/:id' component={SupplierDetails} />

          <PrivateRoute exact path='/category' component={CategoryPage} />
          <PrivateRoute exact path='/category/add' component={addCategory} />
          <PrivateRoute exact path='/category/:id' component={CategoryDetails} />

          <PrivateRoute exact path='/brand' component={BrandPage} />
          <PrivateRoute exact path='/brand/add' component={addBrand} />
          <PrivateRoute exact path='/brand/:id' component={brandDetails} />

          <PrivateRoute exact path='/transcation' component={transcation} />
          <PrivateRoute exact path='/transcation/:id' component={TranscationDetails} />
          <PrivateRoute exact path='/logout' component={Logout} />
          <PrivateRoute component={NoMatch} path="*" />
        </Switch>
        
      
      </Router>
    );
  }
}

export default App;
