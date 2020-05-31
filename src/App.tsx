import React, {useEffect, useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/SignUp';

import Navbar from './Components/Navbar';
import Loading from './Components/Loading/Loading';
import { connect } from 'react-redux';
import { StoreState } from './Redux/Reducers/Reducer';
import HorseFOrm from './Components/HorseForm/HorseForm';
import PrivateRoute from './Components/PrivateRoute';
import { setToken } from './Redux/Actions/Actions';
import {isAuth} from './Utlis/helpers';
import SimpleBreadcrumbs from './Components/Breadcrumb/BreadCrumb';
import Toaster from './Components/Notification/Notification';

function App(props: ComponentProps) {

  useEffect(()=> {
    checkAuth()
  },[])

  const checkAuth = ()=> {
    let useAuth = isAuth();
    props.setToken(useAuth);
  }


 console.log('APP', isAuth);
  return (
    <div className="App">
        <Router>
          <Navbar />
          {props.loading ? <Loading /> : '' }
          <div className="container">
          <Toaster />
          <SimpleBreadcrumbs />
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={Signup}/>
              <PrivateRoute exact path="/add" component={HorseFOrm}/>
              <PrivateRoute exact path="/edit/:horseId" component={HorseFOrm}/>
              <PrivateRoute exact path="/list" component={Home} />
            </Switch>
          </div>          
        </Router>
    </div>
  );
}

interface ComponentProps {
  isToken?: boolean;
  loading?: boolean;
  setToken: typeof setToken;
}

const mapStateToProps = (state: StoreState) => ({
  isToken: state.isToken,
  loading: state.loading
});

const mapDispatchToProps = {setToken}

export default connect(mapStateToProps, mapDispatchToProps)(App);
