import React from 'react' 
import {useNavigate} from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'


let ContactUs = (props)=>{
    let navigate = useNavigate()
    return (
        <React.Fragment>
        <NavBarTwo  navigate={navigate}  />
        <div className='mini-container'>
           <div className='team-side'>
           <h3 className='team-number-title'>Contact Us</h3>
               <div className='container'>
               
              <hr/>
                    <h6>Details</h6>
                   <div style={{color:'green'}}>
                   {/* changes have to be made here */}
                   <h6>Whatsapp : {props.adminPhoneNumber}</h6>
                   <h6>Telegram : {props.adminPhoneNumber}</h6>
                   <h6>Believer01.official@gmail.com</h6>
                   </div>
                    <hr/>
               
               
               <p><b>Coder Bobby</b> who is the only developer and founder of Team Generation Software, he is a professional software Engineer and likes to develop interesting apps</p>
               </div>
           </div>
        </div>
        <GenericFooter />
    </React.Fragment>
    );
}
export default ContactUs;