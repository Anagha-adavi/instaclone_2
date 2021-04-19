import * as actionTypes from '../actions/actionTypes';

const initialState={
    posts:null
}

const reducer=(state=initialState,action)=>{

    switch(action.type){
        case actionTypes.SET_POST:{
            return {
                ...state,
                posts:action.posts
            }
        }
       
        default : return state
        
    }

};

export default reducer;