    import React from 'react';
    import {connect} from 'react-redux';
    import axios from "../../axios";
    // import {Link} from 'react-router-dom';
    // import Modal from '../../components/UI/Modal/Modal';
    // import Post from '../../components/Post/Post';
    import Profile from '../Profile/Profile';
    import * as actions from '../../store/actions/indexActions'
    
    class LoggedInProfile extends React.Component {

        _isMounted = false;

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
            liked:false,
            num_likes:null,
            likedPostId:null
    
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
                this.setState({liked:true,num_likes:result.data.likes.length,likedPostId:id})
            }catch(err){
                console.log(err.response)
            }
            
        }
    
        async componentDidMount(){
            //getting the user data
           
            try{
                this._isMounted=true;
                const response=await axios.get('api/users/getloggedinprofile',
                        {
                            headers:{
                                "Authorization":'Token'+' '+this.props.userKey
                        } 
                    }
                );


                if(this._isMounted=true){
                this.setState({...this.state,user:{...this.state.user,
                    userId:response.data.user.id,
                    userBio:response.data.user.bio,
                    username:response.data.user.username,
                    userDp:response.data.user.profilepic
                }})
            }

                //getting user posts
                const result=await axios.get(`api/users/${this.state.user.userId}/getprofilepostsandfollowers`);
                const posts=result.data.posts;
                const followers=result.data.followers;
    
                this.setState({...this.state,
                            posts,
                            followers      
                })
    
            }catch(err){
                console.log(err.response,"error");
            }
       
            
        }
        
        deletePost=async(postId)=>{
            const response=await axios.delete(`api/posts/${postId}`,
            {
                headers:{
                    "Authorization":'Token'+' '+this.props.userKey
            } 
        });
            const result=await axios.get
            (`api/users/${this.state.user.userId}/getprofilepostsandfollowers`);
            this.setState({...this.state,posts:result.data.posts});


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
            
        return <Profile state={this.state} deletePost={this.deletePost} 
        showModalHandler={this.showModalHandler} getLoggedIn likedHandler={this.likedHandler}
        num_likes={this.state.num_likes&&this.state.likedPostId!==null?this.state.num_likes:null}/>
            
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
    
    
    export default connect(mapStateToProps,mapDispatchToProps)(LoggedInProfile);
    