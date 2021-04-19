import React, { PureComponent } from 'react';
import axios from '../../axios';
import Explore_posts from '../../components/Explore_posts/Explore_posts';
import classes from './Explore.css';
import {connect} from 'react-redux';


class Explore extends PureComponent {

    state={
        posts:[]
    }

    async componentDidMount(){
            try{
                const response=await axios.get('api/posts/');
                this.setState({posts:response.data})

            }catch(err){
                    console.log(err.response);
            }
    }
   
    render() {
        let posts;
        if(this.state.posts.length){
         posts=(
                this.state.posts.map((post)=>{
                    if(post.user.id!==this.props.userId){
                    return (
                    <Explore_posts profile_pic={post.user.profilepic} post_img={post.photo} 
                     profile_link={post.user.username}  key={post.id} user_id={post.user.id}/>)
                    }
                })
        )
            }
        return (
            <div className={classes.explore_container}>
               {posts}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps,null)(Explore);