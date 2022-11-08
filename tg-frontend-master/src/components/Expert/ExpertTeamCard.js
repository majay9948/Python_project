import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom'

const ExpertTeamCard = (props)=>{
    let [timeString,setTimeString] = useState('')
    let [avatar,setAvatar] = useState('0')
    let [name,setName] = useState('expert')
    let navigate = useNavigate()
    //#DE4839
    useEffect(()=>{
        const match_time = new Date(props.data.createdAt).getTime();
        let now = new Date().getTime();
        let distance = now-match_time;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let tempString = ''
        if(days>0)
            tempString += days+"d "
        if(hours>0)
            tempString += hours+"h "
        if(minutes>0)
            tempString += minutes+"m "
        if(seconds>0)
            tempString += seconds+"s "
        setTimeString(tempString)
        console.log(props.expertUsers)
       
    },[])
    useEffect(()=>{
        for(let i=0;i<props.expertUsers.length;i++)
        {
            if(props.expertUsers[i].phoneNumber.toString() === props.data.expertNumber.toString())
            {
                setName(props.expertUsers[i].name)
                setAvatar(props.expertUsers[i].avatar)
                break;
            }
        }
    },[props.expertUsers])
    return (
        <React.Fragment>
        <div className="match-card" onClick={() => { navigate(`/showexpertteams/${props.index}`)}} >
            <div className="d-flex justify-content-between align-items-center border-bottom" style={{marginLeft:10,marginRight:10}}>
                {
                    props.data.typeOfTeams === 'software' ? 
                <div className='badge badge-outline-success'>Created With Software</div>
                    :
                <div className='badge badge-outline-warning'>Created By Human</div>
                }
                <span className='lineups' style={{paddingTop:5,paddingBottom:5}}>Teams Posted : {timeString} ago</span>
            </div> 
            <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                        <img src={`/${avatar}.jpg`} className='team-image' />
                        <span className='font-500'>&nbsp;&nbsp;{name}</span>
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <h1 style={{fontSize:40}}>{props.data.numberOfTeams}</h1>
                    <span style={{fontSize:10}}>Number of Teams</span>
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center' >
                    <img src={`/${props.data.fantasyApp}.jpg`} className='team-image mt-2' />
                    <span style={{fontSize:10}}>Fantasy App</span>
                </div>
            </div>
            <div className="card-end-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between",backgroundColor:'#ffff80'}}>
                {props.data.tossData === 'Predicted11'?
                    <div className='badge badge-outline-warning'>Predicted11</div>
                    :
                    <div className='badge badge-outline-success vp-blink'>Playing11 (lineups)</div>
                }
                <div className='badge badge-outline-success'>{props.data.teamUse}</div>
            </div>
        </div>
        </React.Fragment>
    );
}

export default ExpertTeamCard;