import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router";
import NavBarTwo from '../navbar/NavBarTwo';
import STeam from './STeam'


let ShortcutPrintAuto = (props)=>{
    let navigate = useNavigate()
    let sportIndex = useRef(null)
    const {match,attempt} = useParams()
    let [league,setLeague] = useState(0)
    let [finalTeamData,setFinalTeamData] = useState([[],[],[]])
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
        if(req_attempt.type!=='toss')
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
        let final_team_list = []
        for(let p=0;p<3;p++)
        {
            let vp_list = []
            for(let i=0;i<req_attempt.team_list[p].length;i++)
            {
                let temp_team = req_attempt.team_list[p][i]
                let final_team = get_player_list()// change here
                for(let j=0;j<temp_team.team.length;j++)
                {
                    for(let k=0;k<temp_team.team[j].length;k++)
                    {
                        final_team[j].push(temp_list[temp_team.team[j][k]])
                    }
                }
                vp_list.push({
                    team_number: temp_team.team_number,
                    captain: temp_team.captain,
                    final_team:final_team,
                    vicecaptain : temp_team.vicecaptain,
                    credits: temp_team.credits
                })
            }
            final_team_list.push(vp_list)
        }
        setFinalTeamData(final_team_list)
    },[])
    return (
        <React.Fragment>
            <NavBarTwo navigate = {navigate} />
            <div style={{backgroundColor:'white'}}>
             {/* type of teams start */}
             <nav class=" container d-flex justify-content-around top-nav  pt-1 top-fix-two" style={{maxWidth:1200,padding:0}}>
             <div onClick={()=> setLeague(0)} className={league === 0 ? 'sport-icon sport-icon-active':'sport-icon'}>
                
                 <span style={{padding:8,fontWeight:500}}>Grand League</span>
             </div>
             <div onClick={()=> setLeague(1)} className={league === 1 ? 'sport-icon sport-icon-active':'sport-icon'}>
                  
                 <span style={{padding:8,fontWeight:500}}>Small League</span>
             </div>
             <div onClick={()=> setLeague(2)} className={league === 2 ? 'sport-icon sport-icon-active':'sport-icon'}>
                 
                 <span style={{padding:8,fontWeight:500}}>H2H League</span>
             </div>
         </nav>
             {/* type of teams end */}
            <div className='container' style={{maxWidth:1200,padding:8}}>
               
                <div className="card mt-2 text-center">
                    <div className='card-header d-flex justify-content-between'>
                        <h4>Generated Teams</h4>
                        <button onClick={()=> window.print()} className='btn btn-sm btn-primary' style={{fontWeight:500}}>print</button>
                    </div>
                    <div className="display-team">
                    {/* change here */}
                        { finalTeamData[league].length === 0? 
                           <div style={{paddingTop:40,paddingBottom:130}}>
                            Teams are Not Available 
                           </div>
                        :
                        <React.Fragment>
                        { finalTeamData[league].map((team)=> <STeam teamData = {team} sportIndex={sportIndex.current} type={0} />)}
                        </React.Fragment>   
                        }
                        </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default ShortcutPrintAuto;