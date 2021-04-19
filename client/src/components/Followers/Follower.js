import React from 'react';
import classes from './Follower.css';
import {Link} from 'react-router-dom';

const Followers=(props)=> {
    return (
        <div>
            {props.followers.length!==0?
                props.followers.map(follower=>{
                return (<div className={classes.userSearch_container} key={follower.id}>
                    <div className={classes.user_container} >
                        <div className={classes.pic_container}>
                            <img src={`http://127.0.0.1:8000${follower.follower.profilepic}`} 
                            className={classes.user_img}/>
                        </div>
                        <Link to={`/blank/${follower.follower.id}`} className={classes.username} onClick={props.closeModal}>{follower.follower.username}</Link>
                    </div>
                    {follower.follower.bio ? <div className={classes.comment_text}>{follower.follower.bio}</div>:null}
                </div>)   
            }):<h1 style={{textAlign:"center"}}>THIS USER DOES NOT FOLLOW ANYONE</h1>}
            </div>
        
        
    )
}

export default Followers;