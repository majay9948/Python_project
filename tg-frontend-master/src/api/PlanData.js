import React from 'react' 
import {useNavigate} from 'react-router-dom'
import NavBarFour from '../components/navbar/NavBarFour';
import GenericFooter from '../components/footer/GenericFooter'


let PlanData = (props)=>{
    let navigate = useNavigate()
    return (
        <React.Fragment>
        <NavBarFour  navigate={navigate}  />
        <div className='mini-container'>
           <div className='team-number'>
                <h3 className='team-number-title'>You Don't Have Active Plan</h3>
                <p className='team-number-sub'>Contact us to active your plan </p>
                {/* changes have to be made here*/}
                <p><b><b>Whatsapp : {props.adminPhoneNumber}</b></b></p>
                <p className='team-number-sub'>Gmail : believer01.official@gmail.com</p>
           </div>
        </div>
        <GenericFooter />
    </React.Fragment>
    );
}
export default PlanData;