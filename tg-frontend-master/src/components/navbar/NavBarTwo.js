import React from 'react' 
import {MdWest,MdHome} from 'react-icons/md'

const NavBarTwo = (props)=>{
    return (
        <React.Fragment>
        <nav className="d-flex justify-content-between align-items-center first-nav top-fix-one" style={{backgroundColor:'#563d7c',color:'white'}}>
            <MdWest onClick={() => props.navigate(-1) } size={24} style={{marginLeft:10}} />
            <span className="navbar-brand mb-0 text-center">
                <img className="tg-logo" src="/tg_dark_logo.png" alt="tg logo" />
            </span>
            <MdHome onClick={()=> props.navigate('/')} size={24} style={{marginRight:10}} />
        </nav>
        </React.Fragment>
    );
}

export default NavBarTwo;