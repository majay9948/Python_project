import React from 'react' 
import {useNavigate} from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'


let BestTips = (props)=>{
    let navigate = useNavigate()
    return (
        <React.Fragment>
        <NavBarTwo  navigate={navigate}  />
        <div className='mini-container'>
           <div className='team-side'>
           <h3 className='team-number-title'>Best Tips</h3>
               <div className='container'>
               
              <hr/>
               <p>Many Users won lot of profits and winnign by using this software and i highly recommend you to do research and make best teams with the software</p>
               <p><b>Advanced Generation Section</b> is best for winning good profit with your research as well as software will also help from its side to have the best combinations possible to win 1st Rank.</p>
               </div>
           </div>
        </div>
        <GenericFooter />
    </React.Fragment>
    );
}
export default BestTips;