import React from 'react';
import {connect} from 'react-redux';
import axios from "../../axios";
// import {Link} from 'react-router-dom';
// import Modal from '../../components/UI/Modal/Modal';
// import Post from '../../components/Post/Post';
import Profile from '../Profile/Profile';
import * as actions from '../../store/actions/indexActions'


class UserProfile extends React.Component {

    state={
        user:{
            userId:null,
            userBio:null,
            username:null,  
            userDp:null,
        },
        posts:null,
        followers:null,
        showModal:false,
        postId:null,
        post:null,
        mounted:false,
        canupdate:true,
        liked:false,
        num_likes:null


    }

    async componentDidMount(){
          //getting the user data
          try{
              const userId=this.props.match.params.userId*1;
              const response=await axios.get(`api/users/${userId}`);

                //getting user posts
                const result=await axios.get(`api/users/${userId}/getprofilepostsandfollowers`);
                const posts=result.data.posts;
                const followers=result.data.followers;
            
                this.setState({
                    ...this.state,
                    posts:posts,
                    followers:followers ,
                    mounted:true ,
                    user:{...this.state.user,
                    userId:response.data.id,
                    userBio:response.data.bio,
                    username:response.data.username,
                    userDp:response.data.profilepic
                    }, 
                  
                })

              
            }catch(err){
                console.log(err.response,"error");
            }
    }

   
    
    likedHandler=async(id)=>{
        try{
            const response=await axios.post(`api/posts/${id}/likepost/`,null,
            {
                headers:{
                        "Authorization":'Token'+' '+this.props.userKey
                } 
            });        
            const result=await axios.get(`api/posts/${id}`);  
            this.setState({liked:true,num_likes:result.data.likes.length})
        }catch(err){
            console.log(err.response)
        }
        
    }


    
   
    
   
    showModalHandler=async(id)=>{
        if(id){
            const response=await axios.get(`api/posts/${id}`);
            this.setState({...this.state,showModal:!this.state.showModal,post:response.data});
        }
        else {
            this.setState({...this.state,showModal:!this.state.showModal})
        }
    }


    render(){
      
        
    return (
        <Profile state={this.state} showModalHandler={this.showModalHandler} 
        likedHandler={this.likedHandler}  num_likes={this.state.num_likes}/>
    )
    }
}

const mapStateToProps=(state)=>{

    return {
        userKey:state.auth.userKey,
        userId:state.auth.userId
    }

}

const mapDispatchToProps=(dispatch)=>{
    return {
        fetchPosts:(userKey)=>dispatch(actions.fetchPosts(userKey))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
