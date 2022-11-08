import React,{useEffect,useState} from 'react'
import NavBarTwo from '../navbar/NavBarTwo';
import GenericFooter from '../footer/GenericFooter';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'


const Decision = (props)=>{
    let {id} = useParams()
    let navigate = useNavigate()
    let [primeLoader,setPrimeLoader] = useState(false)
    let [primeTeams,setPrimeTeams] = useState(false)
    let [backupLoader,setBackupLoader] = useState(false)
    let [et,setEt] = useState(false)
    let [ep,setEp] = useState(false)
    let [loader,setLoader] = useState(true)

    let get_player_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

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
        // doing some stuff here 
        if(props.expertMatchList.includes(id.toString()))
            setEt(true)
        if(props.predictionMatchList.includes(id.toString()))
            setEp(true)

        axios.get(`${props.backend}/api/fantasy/match/${id}`)
        .then((response)=>{
            let m_data = response.data.data 
            let player_list = get_player_list()
            props.setLeftName(m_data.left_team_name)
            props.setRightName(m_data.right_team_name)
            props.setLeftImage(m_data.left_team_image)
            props.setRightImage(m_data.right_team_image)
            props.setMatchId(id)  
            let left_count = 0,right_count = 0;
            m_data.left_team_players.forEach((player)=>{
                player.selected = 0
                if(player.playing === 1)
                    left_count++;
                player_list[player.role].push(player)
            })
            m_data.right_team_players.forEach((player)=>{
                player.selected = 0
                if(player.playing === 1)
                    right_count++;
                player_list[player.role].push(player)
            })
            if(left_count === 11 && right_count === 11)
            {
                props.setLineups(true)
            }
            // setPlayerList 
            props.setPlayerList(player_list)
            setLoader(false)
        })

        //calling second api 
        axios.get(`${props.backend}/api/primeteam/getdata/${id}/${props.phoneNumber}`)
        .then((response)=>{
            if(response.status === 200)
            {
                props.setPrimeFetchedData(response.data)
                setPrimeTeams(response.data.primeTeams)
                setPrimeLoader(true)
            }
            else 
            {
                setBackupLoader(true)
            }
        }) 
    },[])

    return (
        <React.Fragment>
            <NavBarTwo navigate ={navigate} />
            
            <div className="mini-container">
            { loader === false ?  
            <React.Fragment>
                <h4 className="sub-heading mb-4">Choose Here</h4>
                {/*prime user stuff here only */}
                {props.primeUser && props.primePlan &&  props.primeMatchList.indexOf(id.toString()) !== -1  ?
                    <React.Fragment>
                    { primeTeams === true ? 
                            <div className='section-card' style={{marginBottom: 10}}>
                                <img className="section-image" src="/primeteam.jpg" alt="prime" />
                                <button onClick={()=>{ navigate('/primedisplay')}} className='btn section-btn' style={{backgroundColor:'purple',color:'white'}}>Continue</button>
                            </div>
                        : 
                        <React.Fragment>
                        {backupLoader === true? 
                            <div className='section-card'>
                                You didn't book Prime Teams.
                            </div>
                            :
                            <div className='section-card'>
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                        }
                        </React.Fragment>
                    }
                
                    </React.Fragment>
                    :
                    null
                }
                    {et === true && ep === false? 
                        <React.Fragment>
                            <div className='section-card' style={{marginBottom: 10,marginTop:0}}>
                                <img className="section-image" style={{height: 100}} src="/expert_teams_lg.jpg" alt="expert teams" />
                                <button onClick={()=>{ navigate(`/expertpanel/${id}`)}} className='btn btn-success section-btn'>Continue</button>
                            </div>
                        </React.Fragment> : null }

                    {et === false && ep === true? 
                        <React.Fragment>
                            <div className='section-card' style={{marginBottom: 10,marginTop:0}}>
                                <img className="section-image" style={{height: 100}} src="/expert_prediction_lg.jpg" alt="expert prediction" />
                                <button onClick={()=>{ navigate(`/expertprediction/${id}`)}} className='btn btn-success section-btn'>Continue</button>
                            </div>
                        </React.Fragment> : null }
                    {/* et === true && ep === true */}
                    { et === true && ep === true ? 
                        <React.Fragment>
                            <div className="d-flex">
                                <div className='section-card' style={{marginBottom: 10,marginTop:0}}>
                                    <img className="section-image" style={{height: 100}} src="/expert_teams_sm.jpg" alt="expert teams" />
                                    <button onClick={()=>{ navigate(`/expertpanel/${id}`)}} className='btn btn-primary section-btn'>Continue</button>
                                </div>
                                <div className='section-card' style={{marginLeft:10, marginBottom: 10,marginTop:0}}>
                                    <img className="section-image" style={{height: 100,}} src="/expert_prediction_sm.jpg" alt="expert prediction" />
                                    <button onClick={ ()=>{ navigate(`/expertprediction/${id}`)} } className='btn btn-dark section-btn'>Continue</button>
                                </div>
                            </div>
                        </React.Fragment>
                        : null }

                    <div className='section-card' style={{marginTop: 0}}>
                        <div className="card-start-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <br/>
                        </div>
                        <img className="section-image" src="/generator.jpg" alt="generator" />
                        <button onClick={()=>{ navigate(`/match/${id}`)}} className='btn btn-success section-btn'>Continue</button>
                </div>
            </React.Fragment>
            : 
            <div style={{display:'flex',justifyContent:'center',marginTop:100}}>
                <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>     
            }
            </div>

            <GenericFooter />
        </React.Fragment>
    );
}

export default Decision;