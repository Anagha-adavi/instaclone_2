import * as actionTypes from './actionTypes';
import axios from '../../axios';


const setPosts=(posts)=>{
    return {
        type:actionTypes.SET_POST,
        posts
    }
}

export const fetchPosts=(userKey)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('api/posts/userfollowingposts',
            {
                    headers:{
                        "Authorization":'Token'+' '+userKey
                }
            }
        );

          const posts=response.data.data;  
            dispatch(setPosts(posts))

        }catch(err){
            console.log(err.response)
        }
    }
}