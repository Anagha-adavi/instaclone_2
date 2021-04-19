import * as actionTypes from '../actions/actionTypes';

const initialState={
    userKey:null,
    loading:false,
    error:null,
    userId:null
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:{
            return {
                ...state,
                loading:true
            }
        }
        case actionTypes.AUTH_SUCCESS:{
            return {
                ...state,
                loading:false,
                userKey:action.userKey,
                userId:action.userId
            }
        }
       
        case actionTypes.AUTH_FAIL:{
            return {
                ...state,
                loading:false,
                error:action.error
            }
        }

        case actionTypes.AUTH_LOGOUT:{
            return {
                ...state,
                loading:false,
                userKey:null
            }
        }
       
        default : return state
        
    }

};

export default reducer;