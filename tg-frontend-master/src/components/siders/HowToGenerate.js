import React from 'react' 
import {useNavigate} from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'


let HowToGenerate = (props)=>{
    let navigate = useNavigate()
    return (
        <React.Fragment>
        <NavBarTwo  navigate={navigate}  />
        <div className='mini-container'>
           <div className='team-side'>
           <h3 className='team-number-title'>How To Generate?</h3>
               <div className='container'>
               
              <hr/>
               <p>Software Available for All matches of Cricket,football and basketball and you can create accurate teams and those teams will be stored and you can even check the results of the teams</p>
               <p><b>Team Generator</b> software have 3 sections, 1) Smart Generation section for Risky Grand League teams and 2) Grand League section for Standard Grand League teams, 3) Advanced generation for more powerful teams </p>
               </div>
           </div>
        </div>
        <GenericFooter />
    </React.Fragment>
    );
}
export default HowToGenerate;