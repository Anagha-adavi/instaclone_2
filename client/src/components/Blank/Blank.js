import React from 'react';
import {Redirect,withRouter} from 'react-router-dom';

class Blank extends React.PureComponent {
    render(){
        console.log("Blank")
    return (
        <div>
            {!this.props.location.tagDetails?
            this.props.userId!==this.props.match.params.userId*1 ?
            <Redirect to={`/user-profile/${this.props.match.params.userId}`} />:
            <Redirect to='/profile'/>
            : <Redirect to={{
                pathname:'/tags',
                tagDetails:this.props.location.tagDetails
            }} />}
        </div>
    )
    }
}

export default withRouter(Blank);
