import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'
import {MdListAlt,MdQueryStats} from 'react-icons/md'
import ExpertTeamCard from './ExpertTeamCard'
import ExpertPredictionCard from './ExpertPredictionCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const ExpertPanel = (props)=>{
    let navigate = useNavigate()
    let {match} = useParams()
    let [loader,setLoader] = useState(true)
    const [expertActive,setExpertActive] = useState([1,0])
    let [teamsCard,setTeamsCard] = useState([])
    let [expertUsers,setExpertUsers] = useState([])
    useEffect(()=>{
        axios.get(`${props.backend}/api/expert/getteams/${match}`)
        .then((response)=>{
            if(response.status === 200)
            {
                props.setFetchedExpertCards(response.data.data)
                props.setExpertUserList(response.data.expertData)
                setLoader(false)
            }
        })
    },[])    
    let handleExpertActive = (index)=>{
        let temp = [...expertActive]
        temp[0]=0;
        temp[1]=0;
        temp[index]=1;
        setExpertActive(temp)
    }           
    return (
        <React.Fragment>
            <NavBarTwo navigate ={navigate} />
            <div  style={{padding:0}}>
              
                <React.Fragment>
                    {/*expert teams*/}
                    <div className="section-info" style={{borderBottom:"4px solid #ffff00",lineHeight:"1.2"}}>
                        <span className='section-primary'>Expert Generation</span><br></br>
                        <span className='section-secondary'>See teams of experts </span><br></br>
                        <span className='section-secondary'>Both software and Human made teams</span>
                    </div>
                    {loader ?  
                        <div className="expert-vp-container">
                            <div style={{display:'flex',justifyContent:'center',marginTop:100}}>
                                <div class="spinner-border text-warning" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>  
                        </div>
                        : 
                    <div className="expert-vp-container" style={{paddingLeft:8,paddingRight:8}}>
                    {props.fetchedExpertCards && props.fetchedExpertCards.map((card,index)=>{
                        return <React.Fragment>
                            <ExpertTeamCard data = {card} expertUsers = {props.expertUserList} index={index} />
                        </React.Fragment>
                    })}
                    </div>
                    }
                </React.Fragment>
              
            </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default ExpertPanel;