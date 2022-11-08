import React from 'react' 
import {useNavigate} from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'


let AboutUs = (props)=>{
    let navigate = useNavigate()
    return (
        <React.Fragment>
        <NavBarTwo  navigate={navigate}  />
        <div className='mini-container'>
           <div className='team-side'>
           <h3 className='team-number-title'>About Us</h3>
               <div className='container'>
               <p> <b>Team Generation</b> is the only tool you need to win Grand league and Small leagues and even H2H leagues in your fantasy application</p>
               <p>This software uses multiple techniques and algorithms to create accurate and winning teams and this software is owned by <b>Believer01</b> youtube channel</p>
               <p><b>Coder Bobby</b> who is the only developer and founder of Team Generation Software, he is a professional software Engineer and likes to develop interesting apps</p>
               </div>
           </div>
        </div>
        <GenericFooter />
    </React.Fragment>
    );
}
export default AboutUs;