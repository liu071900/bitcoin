import React from 'react';

import {
    Route,
    Redirect,
} from "react-router-dom";

export default function PrivteRoute({ authority=undefined,loginState=false,redirect='/user/login',children,location}){
    if(!authority||loginState){
        return <React.Fragment>{children}</React.Fragment>
    }else{
        return <Redirect
        to={{
          pathname: redirect,
          state: { from: location }
        }}
      />

    }
    
}