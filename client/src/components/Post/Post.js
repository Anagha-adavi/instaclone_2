import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{PureComponent} from 'react';
import { Link} from 'react-router-dom';
import classes from './Post.css';
import Comment from '../Comment/Comment';
import axios from '../../axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/indexActions';


class Post extends PureComponent {

    state={
        comment:null,
        comments:[],
        num_likes:null
    }

    async componentDidMount(){
        const result=await axios.get(`api/posts/${this.props.post_id}`);
        const comments=result.data.comments;
        const likes=result.data.likes.length   
        this.setState({comments:comments,num_likes:likes});
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
    
        }catch(err){
            console.log(err.response);
        }
    }
    
    render(){
    // console.log(this.state.num_likes,this.props.num_likes)
    // likes_count=this.props.num_likes===null?this.state.num_likes:this.props.num_likes;
    // console.log(likes_count,"likes");
    let comments;
    return (
        <div>
            <div className={classes.post_container}>
                <div className={classes.post_image}>
                    <img className={classes.img_post} src={this.props.image}/>
                </div>
                <div className={classes.post_info}>
                    <div className={classes.user_detail}>
                        <img src={this.props.profilePic} 
                        className={classes.user_image} />
                        <div>
                            <Link to={this.props.user_id!==this.props.userId?`/user-profile/${this.props.user_id}`:'/profile'} className={classes.profile_link}>{this.props.userName}</Link>
                        </div>
                        <div>
                            {this.props.location}
                        </div>
                    </div>
                    <div className={classes.comments_container}>
                        <div>
                            {this.props.comments.length===0 && this.state.comments.length===0?
                            <h3 style={{textAlign:"center",fontWeight:"bold"}}>Be the first to comment</h3>:
                                comments=this.props.showComments?
                                <div>
                                    <button onClick={this.props.showCommentHandler}>
                                        Hide Comments
                                    </button>
                                    {this.props.modalImage===true?
                                    this.state.comments.map(comment=>{
                                         return <Comment username={comment.user.username}
                                         image={`${comment.user.profilepic}`} 
                                         text={comment.comment_text} 
                                         date={comment.created_at} 
                                         key={comment.id} modalImage={this.props.modalImage}/>
                                    }) :

                                    this.props.comments.map(comment=>{
                                        return <Comment username={comment.user.username}
                                        user_id={comment.user.id}
                                        my_id={comment.user.id}
                                        image={`${comment.user.profilepic}`} 
                                        text={comment.comment_text} 
                                        date={comment.created_at} 
                                        key={comment.id} modalImage={this.props.modalImage}/>
                                   })

                                    }
                                </div>:
                                <button onClick={this.props.showCommentHandler}>
                                    show Comments
                                </button>
                            }
                        </div>
                    </div>
                    <div className={classes.likes_date_container}>
                    <div onClick={this.props.liked}>
                   { this.props.num_likes===null?this.state.num_likes:this.props.num_likes} <FontAwesomeIcon icon='heart' style={{marginLeft:"10px"}} /> Like(s)
                    </div>
                    <div>Caption : {this.props.caption}</div>
                    </div>
                    {/* <div className={post_caption}>Captions</div> */}
                    <div className={classes.comment_input}>
                        <input type="text" className={classes.comment_add}
                         placeholder="add a comment" defaultValue="" 
                         onChange={this.props.modalImage?this.commentChangedHandler:this.props.commentChangedHandler}/>
                        <button 
                            onClick={()=>
                            {
                                return this.props.modalImage?
                                this.postCommentHandler(this.props.post_id):
                                this.props.postCommentHandler(this.props.post_id)
                            }
                            }>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>)
    }
                        
}

const mapStateToProps=(state)=>{
    return {
        userKey:state.auth.userKey,
        post:state.post.posts,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        fetchPosts:(userKey)=>dispatch(actions.fetchPosts(userKey))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);
