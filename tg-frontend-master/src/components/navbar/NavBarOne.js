import React,{useRef} from 'react' 
import { useNavigate } from 'react-router-dom'
import {MdToc,MdRefresh} from 'react-icons/md'
import {BsYoutube,BsFillInfoCircleFill,BsFillArrowDownLeftSquareFill,BsFillTrophyFill,BsFillTelephoneFill,BsBriefcaseFill} from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify';

const NavBarOne = (props)=>{
    let navigate = useNavigate()
    let closeNav = useRef()
    let handleClose = ()=>{
        closeNav.current.style.width="0px"
    }
    let handleOpen = ()=>{
        closeNav.current.style.width="250px"
    }
    let hadleDeletePrimeData = ()=>{
        // eslint-disable-next-line no-restricted-globals
        let confirmation = confirm("Do you really want to delete prime data?")
        if(confirmation === true)
        {
            axios.delete(`${props.backend}/api/prime/remove`)
            .then((response)=>{
                if(response.status === 200)
                {
                    toast.success("Prime data removed!",{position:'top-center'})
                    return;
                }
                else{
                    toast.error("Error while removing prime data!",{position:'top-center'})
                    return;
                }
            })
            .catch((e)=>{
                toast.error("Error while removing prime data!",{position:'top-center'})
                return;
            })
        }
    }
    return (
        <React.Fragment>
        <div  ref={closeNav} className="sidenav">
            <span  className="closebtn" style={{cursor:'pointer'}} onClick={()=> handleClose() }>&times;</span>
            <div className="text-center mb-4">
                <img className="tg-logo" src="/tg_dark_logo.png" style={{width:200}} alt="logo" />
            </div>
            <ul class="list-group list-group-flush m-2" >
                {
                    props.userRole === 'admin' || props.userRole === 'superuser' ?
                    <li onClick={()=>{navigate('/register463980');return}} class="list-group-item" id="side_bar"><span> Register User</span></li>
                    :
                    null
                }
                {
                    props.userRole === 'admin' || props.userRole === 'superuser' ?
                    <li onClick={()=>{navigate('/manageuser');return}} class="list-group-item" id="side_bar"><span>  Manage User</span></li>
                    :
                    null
                }
                {
                    props.userRole === 'superuser' ?
                    <li onClick={()=>{navigate('/accountsdata');return}} class="list-group-item" id="side_bar"><span> Accounts Data </span></li>
                    :
                    null
                } 
                {
                    props.userRole === 'admin' ?
                    <li onClick={()=>{navigate('/notify');return}} class="list-group-item" id="side_bar"><span> Notify </span></li>
                    :
                    null
                }
                {
                    props.userRole === 'admin' ?
                    <li onClick={()=>{navigate('/adminaccountsdata');return}} class="list-group-item" id="side_bar"><span> Admin Accounts Data </span></li>
                    :
                    null
                }
                {
                    props.userRole === 'admin' ?
                    <li onClick={()=>{hadleDeletePrimeData();}} class="list-group-item" id="side_bar"><span> Delete Prime Data </span></li>
                    :
                    null
                }
                <li onClick={()=>{navigate('/howtogenerate'); return }} class="list-group-item" id="side_bar"><span> <BsFillTrophyFill/> &nbsp;  How to generate?</span></li>
                <li onClick={()=>{navigate('/besttips'); return }} class="list-group-item" id="side_bar"> <BsFillInfoCircleFill/> &nbsp; Best tips</li>
                <li onClick={()=>{navigate('/refundpolicy'); return }} class="list-group-item" id="side_bar"> <BsFillArrowDownLeftSquareFill/> &nbsp;  Refund Policy </li>
                <li onClick={()=>{navigate('/contactus'); return }} class="list-group-item" id="side_bar"> <BsFillTelephoneFill/> &nbsp; contact us</li>
                <a style={{padding:0,fontSize:16,border:'0'}} href="https://www.youtube.com/c/believer01"><li  class="list-group-item" id="side_bar"> <BsYoutube/> &nbsp;follow us on youtube</li></a>
                <li onClick={()=>{navigate('/aboutus'); return }} class="list-group-item border-bottom" id="side_bar"> <BsBriefcaseFill/> &nbsp; about us</li>
            </ul>
            <div class="text-center d-flex flex-column align-items-center m-2 mt-4">
                <small>developed by</small>
                <a href="https://www.youtube.com/c/Believer01"  style={{paddingLeft:10}}>
                <img  src="/owner.jpg" style={{width:150}} alt="logo" />
                </a>
                <span>All Rights Reserved</span>
                <span>&copy;2021 Believer01</span>
                <span>CEO Bobby</span>
            </div>
        </div>
        <nav className="d-flex justify-content-between first-nav top-fix-one align-items-center" style={{backgroundColor:'#563d7c'}}>
        <MdToc onClick={()=> handleOpen() } style={{color:'white',marginLeft:5,cursor:'pointer'}} size={40} />  
        <span className="navbar-brand mb-0 text-center">
                <img className="tg-logo" src="/tg_dark_logo.png" alt="tg logo" />
            </span>
        <MdRefresh onClick={()=> {window.location.reload()} } style={{color:'white',marginRight:5,cursor:'pointer'}} size={40} />
        </nav>
        </React.Fragment>
    );
}

export default NavBarOne;