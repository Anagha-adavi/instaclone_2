import React, { PureComponent } from 'react';
import classes from './Login.css';
import axios from '../../../axios';
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom';
import * as actions from '../../../store/actions/indexActions'


class Login extends PureComponent {

    state={
        credentials:{
                username:null,
                password:null,
        },
      }
      
      inputChangedHandler=(e,id)=>{
        let credentials={...this.state.credentials};
    
        if(id==="username"){
          credentials.username=e.target.value;
        }
        else {
          credentials.password=e.target.value;
        }
        this.setState({credentials})
      }
    
      onSubmitHandler=async(e)=>{
        e.preventDefault();
        const credentials={...this.state.credentials};
        this.props.onSubmitAuth(credentials,"login");
      }

    
    render() {

        let component=(
            <div className={classes.container}>
                <form id="form" className={classes.form} onSubmit={this.onSubmitHandler}>
                <h2>Login</h2>
                <div className={classes.form_control}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter username"
                onChange={(event)=>this.inputChangedHandler(event,"username")}
                defaultValue=""/>
                <small>Error message</small>
                </div>
                <div className={classes.form_control}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" defaultValue=""
                onChange={(event)=>this.inputChangedHandler(event,"password")}/>
                <small>Error message</small>
                </div>
                <button type="submit">Submit</button>
                <Link to='/signup' style={{marginTop:"10px",color:"blue",display:"block"}}>Don't have an account ?</Link>
          </form>
            </div>
        );
        if(this.props.userKey)
        {   
            component=<Redirect to='/' />
        }
        return (
            <div>
                {component}
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
    onSubmitAuth:(credentials)=>dispatch(actions.authInit(credentials,"login"))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);