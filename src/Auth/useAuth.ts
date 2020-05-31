import React, {useEffect, useState} from 'react';
import { isAuth } from '../Utlis/helpers';

const useAuth = () => {
    let [isAuthenticate, handleAuthorized] = useState(false);
   
    useEffect( () => {
      if(isAuth() ){
       handleAuthorized( true );
      }  
      else {
       handleAuthorized(false)
      }     
    }, [ isAuth() ]);

    return [ isAuthenticate ]
}

export default useAuth;