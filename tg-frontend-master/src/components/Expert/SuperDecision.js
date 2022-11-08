import React,{useEffect} from 'react'
import NavBarTwo from '../navbar/NavBarTwo';
import GenericFooter from '../footer/GenericFooter';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const SuperDecision = (props)=>{
    let {id} = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        if(props.login === false)
        {
            navigate('/login')
            return 
        }
        if(props.plan === false)
        {
            navigate('/plandata')
        }
      
    },[])

    return (
        <React.Fragment>
            <NavBarTwo navigate ={navigate} />
            <div className="mini-container">
            <h4 className="sub-heading">Choose Here</h4>
                <div className='section-card'>
                    <div className="card-start-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <br/>
                    </div>
                    <img className="section-image" src="/human.jpg" alt="generator" />
                    <button onClick={()=>{ navigate(`/sharehuman/${id}`)}} className='btn btn-success section-btn'>Continue</button>

                </div>
                <div className='section-card'>
                    <div className="card-start-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <br/>
                    </div>
                    <img className="section-image" src="/article.jpg" alt="expert" />
                    <button onClick={()=>{ navigate(`/createpanel/${id}`)} } className='btn btn-primary section-btn'>Continue</button>

                </div>
            </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default SuperDecision;