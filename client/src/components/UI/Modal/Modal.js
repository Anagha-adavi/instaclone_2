import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import classes from './Modal.css';
// import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    
    render () {
        return (
            <div className={classes.post_container}>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    >
                    <div onClick={this.props.closeModal}>
                        <FontAwesomeIcon icon='times' className={classes.icon_styling}/>
                    </div>
                    <div className={classes.post_container}>{this.props.children}</div>
                </div>
            </div>
        )
    }
}

export default Modal;