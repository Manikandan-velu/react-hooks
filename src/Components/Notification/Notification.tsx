import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreState } from '../../Redux/Reducers/Reducer';
import {IToaster} from '../../Interface/interface';

const Toaster = (props: ComponentProps)=> {

    const {notify} = props;

    useEffect(()=> {
        console.log('props', props);
        if(notify?.type === 'error'){
            handleError(notify?.message);
        }else if(notify?.type === 'success'){
            handleSuccess(notify?.message);    
        }
        
    })

    const handleSuccess = (msg:any)=> {
        toast.success(msg ? msg : "Successfully !")
    }

    const handleError = (msg:any)=> {
        toast.error(msg ? msg : "Something wrong !")
    }


    return (
        <ToastContainer />
    )
}

interface ComponentProps {
    notify?: IToaster
  }

const mapStateToProps = (state: StoreState) => ({
    notify: state.toaster
  });

export default connect(mapStateToProps, null)(Toaster);