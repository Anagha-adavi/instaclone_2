import React from 'react';
import classes from './Profile.css';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import Post from '../../components/Post/Post';
import axios from '../../axios';
import Follower from '../../components/Followers/Follower';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Profile extends React.Component {

    state={
        following:false,
        showComments:false,
        followers:0,
        myFollowers:0,
        seeFollowers:false,
        followersDetails:null,
        profilePosts:null,
        comment:null,
        comments:[]

    }

    async componentDidMount(){
        console.log("Component profile mounted")
        if(this.props.match.path==="/user-profile/:userId"){
            console.log("Component user profile mounted")
        try{
            const response=await axios.get(`api/users/${this.props.match.params.userId*1}/getotheruserfollowers`,
            {
                headers:{
                    "Authorization":`Token ${this.props.userKey}`
                }
            });
             const followers=response.data.map(data=>{
                 return data.follower.id
             }) ;


             if(followers.includes(this.props.userId))
             {  
                 this.setState({following:!this.state.following,followers:followers.length});
             }
             else{
                 this.setState({followers:followers.length})
             }

        }catch(err){
            console.log(err.message)
        }
      }
      else {
        try{
            const response=await axios.get(`api/users/getfollowers`,
            {
                headers:{
                    "Authorization":`Token ${this.props.userKey}`
                }
            });
             const followers=response.data.map(data=>{
                 return data.follower.id
             }) ;

            // const result=await axios.get(`api/posts/${id}`);
            // const comments=result.data.comments

            this.setState({followers:followers.length});

            //  this.setState({followers});
        }catch(err){
            console.log(err.message)
        }

      }

      
  }

  followHandler=async(id)=>{
      if(this.state.following===false){
      try {
          const response=await axios.post(`api/users/${id}/follow/`,{},{
            headers:{
                "Authorization":`Token ${this.props.userKey}`
            }
          });
        
          this.setState({following:!this.state.following,followers:this.state.followers+1});

         
          
      }catch(err){
          console.log(err.message)
      }
    }
    else {
        try {
            const response=await axios.post(`api/users/${id}/unfollow/`,{},{
              headers:{
                  "Authorization":`Token ${this.props.userKey}`
              }
            });
          
            this.setState({following:!this.state.following,followers:this.state.followers-1});
        }catch(err){
            console.log(err.message)
        }
    }
  }

  getFollowers=async()=>{
      if(this.props.match.path==="/user-profile/:userId"){
          const response=await axios.get
          (`api/users/${this.props.match.params.userId*1}/getotheruserfollowers`,{
              
            headers:{
                "Authorization":`Token ${this.props.userKey}`
            }
          })
          this.setState({seeFollowers:!this.state.seeFollowers,followersDetails:response.data})

      }
      else {
        const response=await axios.get
        (`api/users/getfollowers`,{
          headers:{
              "Authorization":`Token ${this.props.userKey}`
          }
        })
        this.setState({seeFollowers:!this.state.seeFollowers,followersDetails:response.data})

      }
  }


  commentChangedHandler=(e)=>{
    this.setState({comment:e.target.value})
}

    postCommentHandler=async(id)=>{
    try{
        const response=await axios.post('api/comments/',{
        "comment_text":this.state.comment,
        "post_id":id
    },{
        headers:{
            "Authorization":'Token'+' '+this.props.userKey
    } 
    })


    const result=await axios.get(`api/posts/${id}`);
    const comments=result.data.comments
    this.setState({comments:comments});
    // if(this.props.modal===true){
    //     window.location.reload();
    //     this.props.history.push('/profile');
    // }

    }catch(err){
        console.log(err.response);
    }
}

  deleteCommentHandler=async(id)=>{
      const response=await axios.delete(`api/comments/${id}`);
      }


  showCommentsHandler=()=>{
    this.setState({showComments:!this.state.showComments})
}

  deletePost=async(postId)=>{
      const response=await axios.delete(`api/posts/${postId}`)
  }

    render(){ 
    return (
       
        <div className={classes.profile_container}>
            {(this.props.state.showModal===true && this.props.state.post!==null)?
            <Modal show={this.props.state.showModal} closeModal={()=>this.props.showModalHandler(null)}>
                <Post key={this.props.state.post.id} image={`${this.props.state.post.photo}`} 
                    profilePic={`${this.props.state.post.user.profilepic}`}
                    userName={this.props.state.post.user.username} 
                    user_id={this.props.state.post.user.id}
                    comments={this.state.comments} 
                    num_likes={!this.props.num_likes?this.props.num_likes:this.props.state.post.likes.length}
                    date={this.props.state.post.created_at} 
                    liked={()=>this.props.likedHandler(this.props.state.post.id)}
                    showComments={this.state.showComments} 
                    showCommentHandler={this.showCommentsHandler}
                    post_id={this.props.state.post.id} 
                    location={this.props.state.post.location} 
                    caption={this.props.state.post.caption} 
                    modalImage={true}
                    deleteComment={this.deleteCommentHandler}
                    commentChangedHandler={this.commentChangedHandler}
                    postCommentHandler={this.postCommentHandler}/>
            </Modal>:   
            null}
            <h1 className={classes.heading}>Profile</h1>
            <div className={classes.profile_details}>
                <div className={classes.profile_pic}>
                        <img 
                        // src={`${this.state.user.userDp}`}
                        src={this.props.getLoggedIn===true?
                            `http://localhost:8000${this.props.state.user.userDp}`:`${this.props.state.user.userDp}`
                        }
                        className={classes.img_dp}/>
                </div>
                <div className={classes.profile_info}>
                    <div className={classes.name_update_container}>
                        <div className={classes.username}>{this.props.state.user.username}</div>
                        {
                        this.props.getLoggedIn===true?
                        <div className={classes.buttons}>
                            <div><Link to='/edit-profile' className={classes.btn_editprofile}>Edit Profile</Link></div>
                            <div><Link to='/logout' className={classes.btn_logout}>Logout</Link></div>
                        </div>:
                        <div className={classes.buttons} style={{display:"flex",justifyContent:"center"}}>
                        <div>
                            <button to='/' className={classes.btn_follow} 
                            onClick={()=>this.followHandler(this.props.match.params.userId*1)}>
                            {this.state.following===true?"UnFollow":"Follow"}
                            </button>
                        </div>
                        </div>}
                    </div>
                    <div className={classes.social_details}>
                        <div className={classes.total_posts}>{this.props.state.posts?this.props.state.posts.length:0} posts</div>
                            <div className={classes.total_followers} onClick={this.getFollowers}>
                                {this.state.seeFollowers===false?`${this.state.followers} followers` 
                                :
                                <Modal show>
                                    <Follower followers={this.state.followersDetails}/>
                                </Modal>}
                            </div>
                    </div>
                    {   this.props.getLoggedIn===true?
                        this.props.state.user.userBio?
                        <div className={classes.bio}>
                            Bio - {this.props.state.user.userBio}
                        </div>
                    :
                        <div className={classes.bio} style={{fontSize:"20px"}}>
                            Complete your profile by adding bio
                        </div>
                    :
                        this.props.state.user.userBio?
                        <div className={classes.bio}>
                            Bio - {this.props.state.user.userBio}
                        </div>
                   :null
                    }
                </div>
            </div>
            <h1 className={classes.heading}>Posts</h1>
            {  this.props.getLoggedIn===true
                ? <Link to='/upload-post' className={classes.addPost}>Add post +</Link>:null}
            <div className={classes.posts}>
                {this.props.state.posts?this.props.state.posts.map(post=>{
                    return (
                        <div className={classes.post} key={post.id}>
                            {this.props.getLoggedIn===true?
                            <FontAwesomeIcon icon='trash' className={classes.delete_icon} 
                            onClick={()=>this.props.deletePost(post.id)}/>:null}
                            <img 
                                src={`http://localhost:8000${post.photo}`} 
                                onClick={()=>this.props.showModalHandler(post.id)}
                            className={classes.img}/>
                        </div>
                    )
                }):null}
            </div>
        </div>
    )
    
    }
}

const mapStateToProps=(state)=>{

    return {
        userKey:state.auth.userKey,
        userId:state.auth.userId
    }

}



export default connect(mapStateToProps,null)(withRouter(Profile));
