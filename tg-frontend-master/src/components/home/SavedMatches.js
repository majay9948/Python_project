import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import GenericFooter from '../footer/GenericFooter';
import NavBarFour from '../navbar/NavBarFour';
import SavedMatchCard from './SavedMatchCard';




const SavedMatches = (props)=>{
    let navigate = useNavigate()
    let [matchData,setMatchData] = useState(null)
   

    useEffect(()=>{
        if(props.sportIndex===2)
        {
            props.setPlayerList([[],[],[],[],[]])
            props.setSelectedPlayers([[],[],[],[],[]])
            props.setFixedPlayers([[],[],[],[],[]])
            props.setCaptainPlayers([[],[],[],[],[]])
            props.setVicecaptainPlayers([[],[],[],[],[]])
            props.setRight(0)
            props.setLeft(0)
            props.setRole([0,0,0,0,0])
        }
        else if(props.sportIndex===3)
        {
            props.setPlayerList([[],[],[]])
            props.setSelectedPlayers([[],[],[]])
            props.setFixedPlayers([[],[],[]])
            props.setCaptainPlayers([[],[],[]])
            props.setVicecaptainPlayers([[],[],[]])
            props.setRight(0)
            props.setLeft(0)
            props.setRole([0,0,0])
        }
        else{
            props.setPlayerList([[],[],[],[]])
            props.setSelectedPlayers([[],[],[],[]])
            props.setFixedPlayers([[],[],[],[]])
            props.setCaptainPlayers([[],[],[],[]])
            props.setVicecaptainPlayers([[],[],[],[]])
            props.setRight(0)
            props.setLeft(0)
            props.setRole([0,0,0,0])
        }
        let saved_match_data = localStorage.getItem('saved_match_data')
        if(saved_match_data!== null && saved_match_data!== undefined)
        {
            saved_match_data = JSON.parse(saved_match_data)
            let req_match_list = saved_match_data[props.sportIndex]
            req_match_list.sort((x,y)=>{
                if(x.match_time<y.match_time)
                    return 1;
                return -1;
            })
            setMatchData(req_match_list)
        }
    },[])

    let getSportName = (index)=>{
        if(index === 0) return "Cricket"
        else if(index ===1) return "Football"
        else if(index ===2) return "Basketball"
        else if(index ===3) return "kabaddi"
    }
    return (
        <React.Fragment>
            <NavBarFour  navigate={navigate}  />
            <div className='mini-container' style={{padding:0}}>
                <div className="section-info" style={{lineHeight:"1.2"}}>
                    <span className='section-primary'>{getSportName(props.sportIndex)} Saved Matches</span><br></br>
                    <span className='section-secondary'>you can create teams and check results for saved matches</span><br></br>
                    <span className='section-secondary'>saved matches will be available upto <span style={{color:'black',fontWeight:500}}>7 days</span> only!</span>
                </div>
                <div style={{padding:5}}>
                    { matchData &&  matchData.map((match)=> <SavedMatchCard key={match.id} setSeriesName={props.setSeriesName} setMatchTime={props.setMatchTime}  match = {match} /> ) }
                </div>
                </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default SavedMatches;