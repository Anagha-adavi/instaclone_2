import React, { PureComponent } from 'react';
import classes from './UploadPosts.css';
import axios from '../../../../axios';
import {connect} from 'react-redux';

class UploadPosts extends PureComponent {
    state={
        
            photo:null,
            location:null,
            caption:null,
            tags:null,
       
    }

    async componentDidMount(){
        // const response=await axios.get('api/users/getloggedinprofile',
        // {
        //     headers:{
        //             "Authorization":'Token'+' '+this.props.userKey
        //     } 
        // });
      
    }


    onFileChange=async (e)=>{
        this.setState({photo:e.target.files[0]});
    }

    onLocationChange=async (e)=>{
        this.setState({location:e.target.value});
    }

    onCaptionChange=async (e)=>{
        this.setState({caption:e.target.value})
    }
    

    onTagChange=async(e)=>{
        this.setState({tags:e.target.value});
    }

    onSubmitHandler=async(e)=>{
        e.preventDefault();
        let form_data = new FormData();
        let tags="";
        form_data.append('photo', this.state.photo);

        if(this.state.tags===null)
            form_data.append('tags', "");
        else {
            const result=await axios.get(`api/tags?tagname=${this.state.tags}`);
            if(result.data.length===0){
                const response=await axios.post(`api/tags/`,{tagname:this.state.tags},{
                    headers:{
                        "Authorization":`Token ${this.props.userKey}`
                    }
                });
                form_data.append('tags',tags)
                tags=`${response.data.id}`
            }
            else{
                tags=`${result.data[0].id}`
                form_data.append('tags',tags)
            }
        }

        if(this.state.location!==null)
            form_data.append('location', this.state.location);

        if(this.state.caption!==null)
            form_data.append('caption', this.state.caption);

        // const post={...this.state.post};
        // const posts={...this.state.posts.push(post)};

        try{
            const response=await axios.post(`api/posts/`,form_data,
            {
                headers:{
                        'Authorization':'Token'+' '+this.props.userKey,
                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                } ,
                
            });
            this.props.history.push('/profile');
    }
    catch(err){
        console.log(err.response);
        }
    }

    render() {
        return (
            <form className={classes.pro_container} onSubmit={this.onSubmitHandler}>
                <h3>Upload Post</h3>
                
                <div className={classes.sub_container}>
                    <span>Photo:</span>
                    <input type='file' accept="image/*" onChange={this.onFileChange}/>
                </div>

                <div className={classes.sub_container}>
                <span>Location:</span>
                <input type='text' placeholder="Location" className={classes.input} defaultValue=""
                onChange={this.onLocationChange}/>
                </div>


                <div className={classes.sub_container}>
                <span>Caption:</span>
                <input type='text' placeholder="Caption" className={classes.input}
                defaultValue="" onChange={this.onCaptionChange}/>
                </div>

                <div className={classes.sub_container}>
                <span>Tags:</span>
                <input type='text' placeholder="Tags" className={classes.input}
                defaultValue="" onChange={this.onTagChange}/>
                </div>

                <button type="submit">Upload</button>
            </form>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        userKey:state.auth.userKey
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onUpdateSubmit:()=>dispatch()
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadPosts);