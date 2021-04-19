import React, { PureComponent } from 'react';
import Post from '../../components/Post/Post';
import axios from '../../axios';
import Spinner from '../../UI/Spinner/Spinner';
import {Link} from 'react-router-dom';
import classes from './Home.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class Home extends PureComponent {

    state={
        // posts:null,
        loading:false,
        userId:null,
        liked:false,
        showComments:false,
        comment:null
    }

    async componentDidMount(){
        try{
            this.setState({loading:true})
            this.props.fetchPosts(this.props.userKey);
            const result=await axios.get('api/users/getloggedinprofile',{
                headers:{
                    "Authorization":'Token'+' '+this.props.userKey
            }
            })
            this.setState({loading:false,userId:result.data.user.id})
        }catch(err){
            console.log(err.msg)
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
            this.props.fetchPosts(this.props.userKey)
            this.setState({liked:!this.state.liked})
        }catch(err){
            console.log(err.response)
        }
        
    }

    showCommentsHandler=()=>{
        this.setState({showComments:!this.state.showComments})
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
        this.props.fetchPosts(this.props.userKey);
       
    
    }catch(err){
        console.log(err.response);
    }
    }


    render() {
        let posts=<Spinner />;
        if(this.props.posts!==null){
            if(this.props.posts.length===0){
               posts=(<div className={classes.no_followers_container}>
                   <p>YOU DON'T FOLLOW ANYONE</p>
                   <div>
                       <Link to='/explore'>EXPLORE!!!</Link> TO FOLLOW PEOPLE
                   </div>
               </div>);
            }
            else {
                    posts=this.props.posts.map(post=>{
                    return <Post key={post.id} image={`http://localhost:8000${post.photo}`} 
                    profilePic={`http://localhost:8000${post.user.profilepic}`}
                    userName={post.user.username} comments={post.comments} num_likes={post.likes.length}
                    location={post.location} liked={()=>this.likedHandler(post.id)}
                    caption={post.caption}
                    showComments={this.state.showComments} 
                    showCommentHandler={this.showCommentsHandler}
                    post_id={post.id}
                    user_id={post.user.id} modalImage={false}
                    commentChangedHandler={this.commentChangedHandler}
                    postCommentHandler={this.postCommentHandler}/>
                })
            }
        }
        return (
            <div>
                {/* <Spinner /> */}
                {posts}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        userKey:state.auth.userKey,
        posts:state.post.posts
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        fetchPosts:(userKey)=>dispatch(actions.fetchPosts(userKey))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);