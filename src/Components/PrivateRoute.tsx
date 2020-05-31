import React, {Component, useEffect} from 'react';
import { Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { StoreState } from '../Redux/Reducers/Reducer';
import { isAuth } from '../Utlis/helpers';
import { setToken } from '../Redux/Actions/Actions';
import useAuth from '../Auth/useAuth';
import Login from '../Pages/Login/Login';
import SimpleBreadcrumbs from './Breadcrumb/BreadCrumb';

const PrivateRoute = (props:ComponentProps) => {
  

    const {isToken, component: Component, ...rest } = props;
    
    let conditionalComponent = Login;

    if( isAuth() ){
        conditionalComponent = Component;
    }
    console.log('isAuth', isAuth)

    return (
        <>
        {console.log('isAUth render', isAuth())}
            {isAuth() ?                
                <SimpleBreadcrumbs /> && <Route exact {...rest} component={conditionalComponent} /> :
                <Redirect to="/login" />
            }   
       </>
    )
}

interface ComponentProps extends RouteProps  {
    component: any;
    isToken?: boolean;
    setToken: typeof setToken;
}

const mapStateToProps = (state: StoreState)=> ({
    isToken : state.isToken
})

const mapDispatchToProps = {setToken}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);