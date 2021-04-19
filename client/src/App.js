import React, { Component } from 'react';
import './components/FontAwesomeIcons/Icons'
import axios from './axios';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Auth/Login/Login';
import SignUp from "./containers/Auth/signUp/SignUp";
import Home from './containers/Home/Home';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Explore from './containers/Explore/Explore';
import LoggedInProfile from './containers/LoggedInProfile/LoggedInProfile'
import UserProfile from './containers/UserProfile/UserProfile'
import updateProfile from './containers/Profile/updateProfile/updateProfile';
import * as actions from './store/actions/indexActions';
import UploadPost from './containers/Profile/updateProfile/uploadPosts/UploadPosts';
import Logout from './containers/Auth/Logout/Logout';
import Blank from './components/Blank/Blank';
import Tags from './containers/Tags/Tags';

class App extends Component {

  async componentWillMount(){
    if(localStorage.getItem('token')){
        const result=await axios.get('api/users/getloggedinprofile',
          {
              headers:{
                  "Authorization":'Token'+' '+localStorage.getItem('token')
          } 
        })

      this.props.onSubmitAuth(localStorage.getItem('token'),result.data.user.id);

    }
  }

  render() {
    let routes=(
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/Signup' component={SignUp} /> 
        <Redirect to='/login'/>         
      </Switch>
    );
    if(this.props.userKey){
      routes=(
        <Switch>
          <Route path='/login'  component={Login} />  
          <Route path='/' exact component={Home} />
          <Route path='/explore'  component={Explore} />
          <Route path='/profile'  component={LoggedInProfile} />
          <Route path='/user-profile/:userId' component={UserProfile} />
          <Route path='/edit-profile' component={updateProfile} />
          <Route path='/upload-post' component={UploadPost} /> 
          <Route path='/logout' component={Logout} /> 
          <Route path='/blank/:userId' component={() =><Blank userId={this.props.userId}/>} />
          <Route path='/tags' component={Tags} />
          <Redirect to='/' />
        </Switch> 
        )
      }
    

    return (
      <div>
        <Layout>    
          {routes}    
        </Layout>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
    return {
      userKey:state.auth.userKey,
      userId:state.auth.userId
    }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    onSubmitAuth:(key,userId)=>dispatch(actions.authSucess(key,userId))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);
