import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom'
import { MdVisibility , MdStars } from 'react-icons/md'

const ExpertPredictionCard = (props)=>{
    let [timeString,setTimeString] = useState('')
    let [avatar,setAvatar] = useState('0')
    let [name,setName] = useState('expert')
    let navigate = useNavigate()
    //#DE48390
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
        <div className="match-card" onClick={() => { navigate(`/predictionarena/${props.data._id}`)}} >
            <div className="d-flex justify-content-between align-items-center border-bottom" style={{marginLeft:10,marginRight:10}}>
                <span><MdStars size={18}/>&nbsp;Prediction</span>
                <span className='lineups' style={{paddingTop:5,paddingBottom:5}}>Teams Posted : {timeString} ago</span>
            </div> 
            <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                        <img src={`/${avatar}.jpg`} className='team-image' />
                        <span className='font-500'>&nbsp;&nbsp;{name}</span>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <h1 style={{marginBottom:0}}>{props.data.numberOfViews}</h1>
                    <div className='align-items-center'><MdVisibility size={20} style={{color:'green'}} /><b>&nbsp;<span className='post-date'>post views</span></b></div>
                    
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center' >
                    <img src={`/dream11.jpg`} className='team-image mt-2' />
                    <span style={{fontSize:10}}>Fantasy App</span>
                </div>
            </div>
            <div className="card-end-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between",backgroundColor:'#ff8080'}}>
                {/* props.data.tossData === 'Predicted11' */}
                { props.lineups === false ?
                    <div className='badge badge-outline-success'>Predicted11</div>
                    :
                    <div className='badge badge-outline-success vp-blink'>Playing11</div>
                }
            </div>
        </div>
        </React.Fragment>
    );
}

export default ExpertPredictionCard;