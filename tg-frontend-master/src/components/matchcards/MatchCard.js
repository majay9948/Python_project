import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router';
import {MdLibraryAdd ,MdLibraryAddCheck} from 'react-icons/md'
import { toast } from 'react-toastify';
import axios from 'axios';



const MatchCard = (props)=>{

    const [time,setTime] = useState('')
    const [saved,setSaved] = useState(false)
    const match_time = new Date(props.match.match_time).getTime();
    const lineups = props.match.lineup_out 
    useEffect(()=>{
        let saved_match_data = localStorage.getItem('saved_match_data')
        if(saved_match_data!== null || saved_match_data !== undefined)
        {
            saved_match_data = JSON.parse(saved_match_data) 
            let req_match = null 
          //  console.log(saved_match_data)
            let sport_data = saved_match_data[props.sportIndex]
            for(let i=0;i<sport_data.length;i++)
            {
                if(sport_data[i].id === props.match.id)
                {
                    req_match = sport_data[i]
                }
            }
            if(req_match!== null)
            {
                setSaved(true)
            }
        }
        // console.log(props.primeMatchList)
        // console.log(props.expertMatchList)
        // console.log(props.primeUser)
        // console.log(props.primePlan)
    },[])
    const navigate = useNavigate()
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = match_time - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let timeString = ''
        if(days>0)
            timeString += days+"d "
        if(hours>0)
            timeString += hours+"h "
        if(minutes>0)
            timeString += minutes+"m "
        if(seconds>0)
            timeString += seconds+"s "
        setTime(timeString)
        if (distance < 0) {
          clearInterval(x);
          setTime("Expired")
        }
      }, 1000);
    let handleMatchCard = (id)=>
    {
        props.setSeriesName(props.match.series_name)
        props.setMatchTime(props.match.match_time)
        if(props.expertMatchList === undefined){
            navigate(`/match/${id}`)
            return;
        }
        if(props.expertMatchList.indexOf(id.toString()) !== -1 || props.primeMatchList.indexOf(id.toString())!== -1 || props.predictionMatchList.indexOf(id.toString()) !== -1)
            navigate(`/decision/${id}`)
        else 
            navigate(`/match/${id}`)
    }
    let handleSaveMatch = ()=>{
        let saved_match_data = localStorage.getItem('saved_match_data')
        if(saved_match_data!== null || saved_match_data !== undefined)
        {
            saved_match_data = JSON.parse(saved_match_data) 
            saved_match_data[props.sportIndex].push(props.match) 
            setSaved(true) 
            // some stuff here 
           
            let m_data = null
            let temp = JSON.parse(localStorage.getItem('team_data'))
            for(let i=0;i<temp.length;i++)
            {
                if(temp[i].id.toString() === props.match.id.toString() )
                {
                    m_data = temp[i].data 
                }
            }
            if(m_data === null )
            {
                axios.get(`${props.backend}/api/fantasy/match/${props.match.id}`)
                .then((response)=>{
                    temp.push({
                        id: props.match.id.toString(),
                        data: response.data.data    
                    })
                    m_data = response.data.data 
                    localStorage.setItem('team_data',JSON.stringify(temp))
                })
            }
            localStorage.setItem('saved_match_data',JSON.stringify(saved_match_data))
            toast.success('Match save successfully!',{position:'top-center'})
        }
    }
   
    return (
        <React.Fragment>
            <div className="match-card" >
                <div onClick={() => handleMatchCard(props.match.id)}>
                        <div className="d-flex justify-content-between border-bottom" style={{marginLeft:10,marginRight:10}}>
                        <span className="series-name">{props.match.series_name}</span>
                        <span class="lineups">{lineups? '• Lineups out' : ''}</span>
                    </div> 
                    <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                    <div className="combine-image">
                        <img className="team-image" src={props.match.left_team_image} alt="left" />
                        <span className="left-team-name">{props.match.left_team_name}</span>
                        </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                        <div className="timer"> {time} </div>
                        {props.expertMatchList.indexOf(props.match.id.toString()) !== -1 || props.predictionMatchList.indexOf(props.match.id.toString()) !== -1 ?   <span class="badge badge-outline-success vp-blink" >Expert Analysis</span> : null}
                      </div>
                    <div className="combine-image" >
                    <span className="right-team-name">{props.match.right_team_name}</span>
                        <img className="team-image" src={props.match.right_team_image} alt="right" />
                    </div>
                    
                    </div>
                </div>
                <div className="card-end-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:'center'}} onClick={() => handleMatchCard(props.match.id)}>
                        {
                            props.bookingOpenList.indexOf(props.match.id.toString()) !== -1 ? 
                            <span class="badge badge-outline-success vp-blink" >Bookings Open</span>
                            :
                            <React.Fragment>
                                <span class="badge badge-outline-success" >Mega GL</span>
                                <span class="badge badge-outline-warning" >SL</span>
                                {props.primeUser && props.primePlan && props.primeMatchList.indexOf(props.match.id.toString()) !== -1 ?
                                        <span class="badge badge-outline-success vp-blink" >P</span> 
                                        :
                                        <span class="badge badge-outline-danger">H2H</span>
                                    }
                                {lineups?
                                <span class="badge badge-outline-success">Auto Create</span>
                
                                    : null}
                            </React.Fragment>
                        }
                       
                        </div>
                   {/* here save stuff should be here */}
                   {
                    saved === false ?
                    <span className='btn btn-sm btn-primary' onClick={()=>handleSaveMatch()} style={{padding:"0px 5px",fontSize:12,fontWeight:400}}><MdLibraryAdd  size={14}/>&nbsp;click to save</span>
                     :
                     <span className='btn btn-sm btn-success' onClick={()=>{toast.warning('match already saved!',{position:'top-center'})}} style={{padding:"0px 5px",fontSize:12,fontWeight:400}}><MdLibraryAddCheck  size={14}/>&nbsp;match saved</span>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default MatchCard;