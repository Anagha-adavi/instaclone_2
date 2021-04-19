import React, { PureComponent } from 'react'
import classes from './Layout.css';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import {connect} from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom';
import axios from "../../axios";
import Modal from "../../components/UI/Modal/Modal";
import User from '../../components/UserSearch/User';

class Layout extends PureComponent {

    state={
        profilePic:null,
        search:false,
        show:false,
        users:null,
        footerSearch:false,
        tags:false,
        tagDetails:null,

    }

    closeModal=()=>{
        this.setState({show:!this.state.show})
    }

    askToSearch=()=>{
        this.setState({footerSearch:!this.state.footerSearch})
    }
    

    setProfilePic=async(userId)=>{
        try{
                    if(userId){
                        const response=await axios.get(`api/users/${userId}`);
                        this.setState({
                            profilePic:response.data.profilepic});
                    }
                }catch(err){
                    console.log(err.response);
                }
        }

        searchChangeHandler=async(e)=>{
            if(e.key==='Enter')
           {   
               if(e.target.value!==''){
              if(e.target.value.split("").includes('#')){
                  const hashedTagname=e.target.value.split("");
                  const tagname=hashedTagname.slice(1,hashedTagname.length).join("");
                  const response=await axios.get(`/api/tags?tagname=${tagname}`);
                  if(response.data.length===0){
                      alert("The tag u r finding doesn't exist :( Create one by uploading a post");
                      window.location.reload();
                  }
                  else {
                  this.setState({tags:true,tagDetails:response.data})
                  }
              }
              else{
               const response=await axios.get(`api/users?search=${e.target.value}`);
               this.setState({search:true,users:response.data,show:true});
              }
           }
        }
           
        }

    render() {
        if(this.props.userId)
        {
            this.setProfilePic(this.props.userId);
        }
        return (
            <div >
                <header>
                    <NavigationItems userId={this.props.userId} 
                    userKey={this.props.userKey} 
                    image={this.state.profilePic}
                    searchChangeHandler={this.searchChangeHandler}
                    askToSearch={this.askToSearch}
                    footerSearch={this.state.footerSearch}/>
                </header>
                {this.state.search===true?
                <Modal show={this.state.show} closeModal={this.closeModal}>
                    {this.state.users.length!==0?this.state.users.map(user=>{
                        return <User user={user} closeModal={this.closeModal} key={user.id}/>
                    }):<h1 style={{textAlign:"center"}}>NO USERS FOUND FOR THAT USERNAME</h1>}
                </Modal>:null}
                {this.state.tags===true?
                <Redirect 
                    to={{
                        pathname:`/blank/${this.state.tagDetails[0].id}`,
                        tagDetails:this.state.tagDetails,
                        tags:true
                    }}/>:null}
                <main>
                    {this.props.children}
                </main>
            </div>
    
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        userId:state.auth.userId,
        userKey:state.auth.userKey
    }
}

export default connect(mapStateToProps,null)(withRouter(Layout));