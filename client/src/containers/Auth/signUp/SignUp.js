import React, { PureComponent } from 'react'
import classes from './style.css';
import axios from '../../../axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/indexActions';

class SignUp extends PureComponent {

  state={
    credentials:{
            username:null,
            email:null,
            password1:null,
            password2:null,
    },
  }
  

  inputChangedHandler=(e,id)=>{

    let credentials={...this.state.credentials};

    if(id==="username"){
      credentials.username=e.target.value;
    }
    else if (id==="email"){
      credentials.email=e.target.value;
    }
    else if(id==="password1"){
      credentials.password1=e.target.value;
    }
    else{
      credentials.password2=e.target.value;
    }


    this.setState({credentials})
  }

  onSubmitHandler=async(e)=>{
    e.preventDefault();
    this.props.onSubmitAuth(this.state.credentials);
    // this.props.history.push('/profile')
  }

  render() {
    return (
      <div className={classes.container}>
          <form id="form" className={classes.form} onSubmit={this.onSubmitHandler}>
            <h2>Register With Us</h2>
            <div className={classes.form_control}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter username"
               onChange={(event)=>this.inputChangedHandler(event,"username")}
               defaultValue=""/>
              <small>Error message</small>
            </div>
            <div className={classes.form_control}>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" placeholder="Enter email" defaultValue=""
              onChange={(event)=>this.inputChangedHandler(event,"email")}/>
              <small>Error message</small>
            </div>
            <div className={classes.form_control}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter password" defaultValue=""
              onChange={(event)=>this.inputChangedHandler(event,"password1")}/>
              <small>Error message</small>
            </div>
            <div className={classes.form_control}>
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                placeholder="Enter password again"
              defaultValue=""
              onChange={(event)=>this.inputChangedHandler(event,"password2")}/>
              <small>Error message</small>
            </div>
            <button type="submit">Submit</button>
          </form>
    </div>
      
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
    onSubmitAuth:(credentials)=>dispatch(actions.authInit(credentials,"signup"))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);