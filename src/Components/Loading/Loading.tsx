import React from 'react';
import './Loading.scss'

const Loading = ()=> {
    return (
        <div className="overlay-wrap">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>        
    )
}

export default Loading;