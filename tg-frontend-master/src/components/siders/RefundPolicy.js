import React from 'react' 
import {useNavigate} from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'


let RefundPolicy = (props)=>{
    let navigate = useNavigate()
    return (
        <React.Fragment>
        <NavBarTwo  navigate={navigate}  />
        <div className='mini-container'>
           <div className='team-side'>
           <h3 className='team-number-title'>Refund Policy</h3>
               <div className='container'>
               
              <hr/>
               <p>It is a software to create teams for Fantasy and made with lot of algorithms and combinations, but fantasy is something we cannot give 100% guarantee for winning, although software have very great winning rate</p>
               <p><b>All Packs are non-Refundable</b> and refund will be considered for special cases with lot of conditions</p>
               </div>
           </div>
        </div>
        <GenericFooter />
    </React.Fragment>
    );
}
export default RefundPolicy;