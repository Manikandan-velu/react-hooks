import React, { useEffect } from 'react';
import Link from 'react-router-dom';
import { connect } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { isAuth } from '../Utlis/helpers';
import {logout} from '../Services/xhr';
import { setToken } from '../Redux/Actions/Actions';
import { useHistory } from "react-router-dom";
import { StoreState } from '../Redux/Reducers/Reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Navbar = (props: ComponentProps)=> {

  console.log('Navbar', props);

  const classes = useStyles();
  const history = useHistory();

  useEffect(()=> {
    console.log(props);
  },[])

  const handleLogout = ()=> {
    console.log('im logout');
    logout()
    props.setToken(false);
    history.push('/login');
  }

  return (
    // <Appbar position="static">
    //     <Toolbar className="nav-container" >
    //         <Button color="inherit" href="/"> Home </Button>
    //         <Typography variant="h6" className={classes.title}>              
    //         </Typography>
    //         <Button color="inherit" href="/login"> Login </Button>
    //         <Button color="inherit" href="/signup"> Signup </Button>
    //         <Button></Button>
    //     </Toolbar>
    // </Appbar>
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>          
          <Typography variant="h6" className={classes.title}>            
          </Typography>
          {props.isToken ? 
           <Button color="inherit" onClick={handleLogout}>Logout</Button> : 
           <Button color="inherit" href="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

interface ComponentProps {
  isToken?: boolean;
  setToken : typeof setToken;
}

const mapStateToProps = (state: StoreState)=> ({
  isToken: state.isToken,
})

const mapDispatchToProps = { setToken }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);