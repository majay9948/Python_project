import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router";
import NavBarTwo from '../navbar/NavBarTwo';
import ShareTeam from './ShareTeam'
import {MdIosShare } from 'react-icons/md'
import { toast } from 'react-toastify';


let ShareSoftware = (props)=>{
    let navigate = useNavigate()
    let [selectedTeams,setSelectedTeams] = useState([])
    let [tempListState,setTempListState] = useState([])
    let sportIndex = useRef(null)
    const {match,attempt} = useParams()
    let [finalTeamData,setFinalTeamData] = useState([])
    let get_player_list = ()=>{
        if(sportIndex.current===2)
            return [[],[],[],[],[]]
        else if(sportIndex.current===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }
    useEffect(()=>{
      
        let data = JSON.parse(localStorage.getItem('tgk_data'))
        for(let i=0;i<data.length;i++)
        {
            for(let j=0;j<data[i].length;j++)
            {
                if(data[i][j].id.toString() === match.toString())
                {
                    sportIndex.current = i;
                    break;
                }
            }
        }
        let match_list = data[sportIndex.current] 
        let req_match = null 
        for(let i=0;i<match_list.length;i++)
        {
            if(match_list[i].id.toString() === match.toString())
            {
                req_match = match_list[i]
                break;
            }
        }
     //   console.log(sportIndex.current)
      //  console.log(req_match)
        if(req_match===null)
        {
            navigate('/')
            return 
        }
        let req_attempt = null 
        for(let i=0;i<req_match.attempts.length;i++)
        {
            if(attempt.toString() === req_match.attempts[i].id.toString())
            {
                req_attempt = req_match.attempts[i]
            }
        }
        if(req_attempt===null)
        {
            navigate('/')
            return 
        }
        let temp_list = []
        for(let i=0;i<70;i++)
            temp_list.push({})
        for(let i=0;i<req_attempt.player_list.length;i++)
        {
            for(let j=0;j<req_attempt.player_list[i].length;j++)
            {
                let p = req_attempt.player_list[i][j]
                temp_list[p.player_index] = p;
            }
        }
        setTempListState(temp_list)
        
        let final_team_list = []
        for(let i=0;i<req_attempt.team_list.length;i++)
        {
            let temp_team = req_attempt.team_list[i]
            let final_team = get_player_list()
            for(let j=0;j<temp_team.team.length;j++)
            {
                for(let k=0;k<temp_team.team[j].length;k++)
                {
                    final_team[j].push(temp_list[temp_team.team[j][k]])
                }
            }
            final_team_list.push({
                team_number: temp_team.team_number,
                captain: temp_team.captain,
                final_team:final_team,
                vicecaptain : temp_team.vicecaptain,
                credits: temp_team.credits
            })
        }
        setFinalTeamData(final_team_list)
    },[])

    let handleShareTeams = ()=>{
        if(selectedTeams.length>0)
        {
            let shareStuff = []
            for(let i=0;i<selectedTeams.length;i++)
            {
                let t_index = selectedTeams[i]
                let req_team  = finalTeamData[t_index]
                let finalShareTeam = get_player_list()
                for(let j=0;j<req_team.final_team.length;j++)
                {
                    for(let k=0;k<req_team.final_team[j].length;k++)
                    {
                        let p = req_team.final_team[j][k]
                        finalShareTeam[j].push({player_index:p.player_index,credits:p.credits})
                    }
                }
                shareStuff.push({
                    team_number: i+1,
                    captain: req_team.captain,
                    vicecaptain: req_team.vicecaptain,
                    credits: req_team.credits,
                    team:finalShareTeam
                })
            }
            props.setSoftwareTeams(shareStuff)
            navigate(`/storeexpertteams/${match}/0`)
            return;
        }
        else 
        {
            toast.error('Select Atleast One Teams!',{position:'top-center'})
            return;
        }
    }

    return (
        <React.Fragment>
            <NavBarTwo navigate = {navigate} />
            <div style={{backgroundColor:'white'}}>
            <nav class=" container d-flex justify-content-around top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0}}>
                <div onClick={()=>{}} className='sport-icon'>
                        <h2 style={{color:'black'}}>{finalTeamData.length}</h2>
                    <span>Total Teams</span>
                </div>
                <div onClick={()=>{}} className='sport-icon'>
                        <h2 style={{color:'black'}}>{selectedTeams.length}</h2>
                    <span>Selected Teams</span>
                </div>
                <div onClick={()=> handleShareTeams()}  className={'sport-icon'}>
                     <MdIosShare style={{color:'green'}} size={36} />
                    <span>Share Teams</span>
                </div>    
            </nav>
            <div className='share-container' style={{maxWidth:1200,padding:8}}>

                <div className="card mt-2 text-center">
                    <div className='card-header d-flex justify-content-between'>
                        <h4>Select Teams to share</h4>
                    </div>
                    <div className="display-team">
                        {finalTeamData && finalTeamData.map((team,index)=> <ShareTeam teamData = {team} sportIndex={sportIndex.current} index={index} setSelectedTeams={setSelectedTeams} selectedTeams={selectedTeams} type={0} />)}
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default ShareSoftware;





