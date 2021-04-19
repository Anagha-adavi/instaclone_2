import React from 'react';
import classes from './NavigationItems.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const NavigationItems=(props)=> {
    return (
        <header>
              <nav className={classes.header}>
                    <h3>Socioholic</h3>
                    
                        <input type='text' placeholder="search" className={classes.search_bar} 
                        defaultValue="" onKeyPress={props.searchChangeHandler}/>
                    
                    <div className={classes.header_nav}>
                        <Link to='/' ><FontAwesomeIcon icon='home' className={classes.icon_styling}/></Link>
                        <Link to='/explore' ><FontAwesomeIcon icon='compass' className={classes.icon_styling}/></Link>
                        <Link to={'/profile'} >
                            {props.userKey===null?
                            <FontAwesomeIcon icon='user' className={classes.icon_styling}/>:
                            <div>
                                <img src={`${props.image}`}  className={classes.userPic} />
                            </div>}
                        </Link>
                    </div>
                    <footer className={classes.footer}>
                            <div onClick={props.askToSearch}>
                                <FontAwesomeIcon icon='search' className={classes.icon_styling}/>
                            </div>
                            {props.footerSearch===true?<div>
                                <input type='text' placeholder="search" className={classes.search_bar} 
                                defaultValue="" onKeyPress={props.searchChangeHandler} 
                                style={{display:"block",visibility:"visible",marginRight:"0"}}/>
                            </div>:null}
                            <Link to='/' ><FontAwesomeIcon icon='home' className={classes.icon_styling}/></Link>
                            <Link to='/explore' ><FontAwesomeIcon icon='compass' className={classes.icon_styling}/></Link>
                            <Link to={'/profile'} >
                                {props.userKey===null?
                                <FontAwesomeIcon icon='user' className={classes.icon_styling}/>:
                                <div>
                                    <img src={`${props.image}`}  className={classes.userPic} />
                                </div>}
                            </Link>
                    </footer>
                </nav>

            </header>
       
    )
}

export default NavigationItems;
