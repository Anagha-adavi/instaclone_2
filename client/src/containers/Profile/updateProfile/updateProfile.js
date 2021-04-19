import React, { PureComponent } from 'react';
import classes from './updateProfile.css';
import axios from '../../../axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class UpdateProfile extends PureComponent {
    state={
        user:{
            profilepic:null,
            username:null,
            firstname:null,
            lastname:null,
            email:null,
            bio:null,
            id:null
        }
    }

    async componentDidMount(){
        const response=await axios.get('api/users/getloggedinprofile',
        {
            headers:{
                    "Authorization":'Token'+' '+this.props.userKey
            } 
        });
        const user=response.data.user
        this.setState({user:{...this.state.user,id:user.id}});
    }


    onFileChange=async (e)=>{
        this.setState({user:{...this.state.user,profilepic:e.target.files[0]}});
    }

    onNameChange=async (e)=>{
       
        this.setState({user:{...this.state.user,username:e.target.value}})
    }
    onFirstNameChange=async (e)=>{
        this.setState({user:{...this.state.user,firstname:e.target.value}})
    }
    onLastNameChange=async (e)=>{
        this.setState({user:{...this.state.user,lastname:e.target.value}})
    }
   
    onEmailChange=async(e)=>{
        this.setState({user:{...this.state.user,email:e.target.value}})
    }

    onBioChange=async(e)=>{
        this.setState({user:{...this.state.user,bio:e.target.value}})
    }

    onSubmitHandler=async(e)=>{
        e.preventDefault();
        let form_data = new FormData();

        if(this.state.user.username!==null)
            form_data.append('username', this.state.user.username);

        if(this.state.user.profilepic!==null)
            form_data.append('profilepic', this.state.user.profilepic);

        if(this.state.user.firstname!==null)
            form_data.append('firstname', this.state.user.firstname);

        if(this.state.user.lastname!==null)
            form_data.append('lastname', this.state.user.lastname);

        if(this.state.user.email!==null)
            form_data.append('email', this.state.user.email);

        if(this.state.user.bio!==null)
            form_data.append('bio', this.state.user.bio);

        try{
            const response=await axios.patch(`api/users/${this.state.user.id}/`,form_data,
            {
                headers:{
                        'Authorization':'Token'+' '+this.props.userKey,
                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                } ,
                
            });
            window.location.reload();
            this.props.history.push('/profile');

    }
    catch(err){
        console.log(err.response);
        }
    }

    render() {
        return (
            <form className={classes.pro_container} onSubmit={this.onSubmitHandler}>
                <h3>Update My profile</h3>
                
                <div className={classes.sub_container}>
                    <span>Change photo:</span>
                    <input type='file' accept="image/*" onChange={this.onFileChange}/>
                </div>

                {/* <div className={classes.sub_container}>
                <span>Username:</span>
                <input type='text' placeholder="new username" className={classes.input} defaultValue=""
                onChange={this.onNameChange}/>
                </div> */}

                <div className={classes.sub_container}>
                <span>First Name:</span>
                    <input type='text' placeholder='first name' className={classes.input} defaultValue=""
                    onChange={this.onFirstNameChange}/>
                </div>

                <div className={classes.sub_container}>
                <span>Last name:</span>
                <input type='text' placeholder="last name" className={classes.input}
                defaultValue="" onChange={this.onLastNameChange}/>
                </div>

                <div className={classes.sub_container}>
                <span>Email:</span>
                <input type='email' placeholder="email" className={classes.input}
                defaultValue="" onChange={this.onEmailChange}/>
                </div>

                <div className={classes.sub_container}>
                <span>Bio:</span>
                <input type='text' placeholder="New Bio" className={classes.input}
                defaultValue="" onChange={this.onBioChange}/>  
                </div>
                <button type="submit">Submit</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProfile);