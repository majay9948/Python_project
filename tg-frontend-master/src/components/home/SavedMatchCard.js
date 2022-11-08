import React,{useEffect,useState} from 'react' 
import { useNavigate } from 'react-router-dom'

const SavedMatchCard = (props) =>{
    let navigate = useNavigate()
    let [agoTime,setAgoTime] = useState('')
    let [displayDate,setDisplayDate] = useState(null)
    let month_arry = [ "Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec" ]
    let doubleNumber = (number) =>
    {
        let temp = Number(number) 
        if(temp<10)
        return '0'+temp;
        else 
        return temp+''
    }
    useEffect(()=>{
        const match_time = new Date(props.match.match_time)
        const vp = new Date(props.match.match_time).getTime()
        const now = new Date(Date.now()).getTime()
        if(now>vp)
        {
        let distance = now-vp;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let timeString = ''
        if(days>0)
            timeString += days+"d "
        if(hours>=0)
            timeString += hours+"hrs "
        
        setAgoTime(timeString+'ago')
        }
        else 
        {
            setAgoTime('Not started')
        }

        setDisplayDate(`${doubleNumber(match_time.getHours())}:${doubleNumber(match_time.getMinutes())} - ${match_time.getDate()} ${month_arry[match_time.getMonth()]}`)
    },[])

    let handleMatchCard = ()=>{
        props.setSeriesName(props.match.series_name)
        props.setMatchTime(props.match.match_time)
        navigate(`/match/${props.match.id}`)
        return;
    }
    return (
        <React.Fragment>
            <div className="match-card" onClick={() => handleMatchCard(props.match.id)}>
            
                        <div className="d-flex justify-content-between border-bottom" style={{marginLeft:10,marginRight:10}}>
                        <span className="series-name">{props.match.series_name}</span>
                        <span class="lineups">{agoTime}</span>
                    </div> 
                    <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                    <div className="combine-image">
                        <img className="team-image" src={props.match.left_team_image} alt="left" />
                        <span className="left-team-name">{props.match.left_team_name}</span>
                        </div>
                        <div className="timer text-success"> {displayDate} </div>
                    <div className="combine-image" >
                    <span className="right-team-name">{props.match.right_team_name}</span>
                        <img className="team-image" src={props.match.right_team_image} alt="right" />
                    </div>
                    
                    </div>
                
                <div className="card-end-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:'center'}} >
                        <span class="badge badge-outline-success" >Mega GL</span>
                        <span class="badge badge-outline-warning" >SL</span>
                        <span class="badge badge-outline-danger">H2H</span>
                   </div>
                </div>
            </div>
        </React.Fragment>
    );
} 

export default SavedMatchCard;