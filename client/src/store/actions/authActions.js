import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSucess=(userKey,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        userKey,
        userId
    }
}

export const authLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authInit=(credentials,authType)=>{
    return async(dispatch)=>{
        dispatch(authStart()); 
        
        if(authType==="login"){
            try{
                const response=await axios.post('auth/login/',credentials);
                localStorage.setItem('token',response.data.key);

                const result=await axios.get('api/users/getloggedinprofile',
                    {
                        headers:{
                            "Authorization":'Token'+' '+response.data.key
                    } 
                }  
            );
            localStorage.setItem('token',response.data.key);
            localStorage.setItem('userId',result.data.user.id);
            dispatch(authSucess(response.data.key,result.data.user.id))

            }catch(err){
                alert(err.response.data.non_field_errors[0])
                console.log(err.response)
            }
        }
        else {
            try{
                const response=await axios.post('auth/registration/',credentials);
                localStorage.setItem('token',response.data.key);

                const result=await axios.get('api/users/getloggedinprofile',
                {
                    headers:{
                        "Authorization":'Token'+' '+response.data.key
                } 
            })
                dispatch(authSucess(response.data.key,result.data.user.id))
            }catch(err){
                if(err.response.data.username){
                    alert(err.response.data.username[0])
                }
                if(err.response.data.email){
                    alert(err.response.data.email[0])
                }
                if(err.response.data.non_field_errors){
                    alert(err.response.data.non_field_errors[0])
                }
                if(err.response.data.password1[0]){
                    alert(err.response.data.password1[0])
                }
                if(err.response.data.password1[1]){
                    alert(err.response.data.password1[1])
                }
                console.log(err.response)
            }  
        }

    }
}