import React from 'react';
import {connect} from 'react-redux';
import { logOut } from '../../redux/auth';

const LogOut = (props) => {
    const {dispatch, history} = props;
    React.useEffect(() => {
        dispatch(logOut()).then(({apiresponse: response})=>{
            console.log("response", response)
            if(response.message = "You are already logout,there is not login session"){
                history.push("/");
            }
        }).catch((error)=>{
            console.log("LOGIN ERROR: ", error);
        });
    }, []);
    return null;
}



export default connect()(LogOut);
