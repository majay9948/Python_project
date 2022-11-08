import React,{useEffect,useState} from 'react' 
import { useNavigate } from "react-router-dom";
import GenericFooter from '../footer/GenericFooter';
import NavBarTwo from '../navbar/NavBarTwo';


const Section = (props)=>{
    let navigate = useNavigate()
    
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        if(props.sportIndex===2)
        {
            props.setFixedPlayers([[],[],[],[],[]])
            props.setCaptainPlayers([[],[],[],[],[]])
            props.setVicecaptainPlayers([[],[],[],[],[]])
        }
        else if(props.sportIndex===3)
        {
            props.setFixedPlayers([[],[],[]])
            props.setCaptainPlayers([[],[],[]])
            props.setVicecaptainPlayers([[],[],[]])
        }
        else 
        {
            props.setFixedPlayers([[],[],[],[]])
            props.setCaptainPlayers([[],[],[],[]])
            props.setVicecaptainPlayers([[],[],[],[]])
        }
      
    },[])
    return (
        <React.Fragment>
        <NavBarTwo navigate ={navigate} />
        <div className="mini-container">
        <h4 className="sub-heading">Select Section</h4>
        <br/>
        { props.sportIndex === 0? 
            <div className='section-card'>
                <img className="section-image" src="/sg.jpg" alt="smart" />
                <button onClick={()=>{ navigate('/smart')}} className='btn btn-success section-btn'>Continue</button>
            </div>
            : null
        }
            <div className='section-card'>
                <img className="section-image" src="/gl.jpg" alt="smart" />
                <button onClick={()=>{ navigate('/grand')}} className='btn btn-success section-btn'>Continue</button>

            </div>
            <div className='section-card'>
                <img className="section-image" src="/ag.jpg" alt="smart" />
                <button onClick={()=>{ navigate('/fixed')}} className='btn btn-success section-btn'>Continue</button>

            </div>
        </div>
        <GenericFooter />
        </React.Fragment>
    );
}

export default Section;