import React from 'react';
import { Router } from 'react-router-dom';
import classes from './Comment.css';
import {Link} from 'react-router-dom';

const Comment=(props)=> {
    return (

        <div>
            <div className={classes.comment_container}>
                <div className={classes.user_container} >
                    <div className={classes.pic_container}>
                        <img src={`${props.image}` } 
                        className={classes.user_img}/>
                    </div>
                    <Link to={props.user_id!==props.my_id?`/user-profile/${props.user_id}`:'/profile'} className={classes.username}>{props.username}</Link>
                </div>
                <div className={classes.comment_text}>{props.text}</div>
            </div>
        </div>
        
    )
}

export default Comment
