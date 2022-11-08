import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'
import {MdListAlt,MdQueryStats  } from 'react-icons/md'
import ExpertTeamCard from './ExpertTeamCard'
import ExpertPredictionCard from './ExpertPredictionCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const ExpertPredictionPanel = (props)=>{
    let navigate = useNavigate()
    let {match} = useParams()
    let [loader,setLoader] = useState(true)
    let [fetchedPredictionCards,setFetchedPredictionCards] = useState([])
    let [expertUserList,setExpertUserList] = useState([])
    useEffect(()=>{
        axios.get(`${props.backend}/api/expert/list/getprediction/${match}`)
        .then((response)=>{
            if(response.status === 200)
            {
                setFetchedPredictionCards(response.data.data)
                console.log(response.data.data)
                // we have to do some advanced filter here 
                setExpertUserList(response.data.predictionData)
                setLoader(false)
            }
        })
    },[])           
    return (
        <React.Fragment>
            <NavBarTwo navigate ={navigate} />
            <div  style={{padding:0}}>
                <React.Fragment>
                    {/*expert teams*/}
                    <div className="section-info" style={{borderBottom:"4px solid red",lineHeight:"1.2"}}>
                        <span className='section-primary'>Expert Prediction</span><br></br>
                        <span className='section-secondary'>See stats and data </span><br></br>
                        <span className='section-secondary'>must see and analyse researched data</span>
                    </div>
                    {loader ?  
                        <div className="expert-vp-container">
                            <div style={{display:'flex',justifyContent:'center',marginTop:100}}>
                                <div class="spinner-border text-danger" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>  
                        </div>
                        : 
                    <div className="expert-vp-container" style={{paddingLeft:8,paddingRight:8}}>
                    { fetchedPredictionCards && fetchedPredictionCards.map((card,index)=>{
                        return <React.Fragment>
                            <ExpertPredictionCard data = {card} expertUsers = {expertUserList} index={index} lineups={props.lineups} />
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

export default ExpertPredictionPanel;