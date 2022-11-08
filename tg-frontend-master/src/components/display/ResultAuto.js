import React,{useState,useEffect,useRef} from 'react' 
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router";
import NavBarTwo from '../navbar/NavBarTwo';
import Team from './Team'



const ResultAuto = (props)=>{
    let navigate = useNavigate()
    let sportIndex = useRef()
    let [league,setLeague] = useState(0)
    const {match,attempt} = useParams()
    let [finalTeamData,setFinalTeamData] = useState([[],[],[]])
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
        if(req_match===null || req_match.status === 0 )
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
        let points_data = []
        for(let i=0;i<70;i++)
            points_data.push(0)
        for(let i=0;i<req_match.player_list.length;i++)
        {
            for(let j=0;j<req_match.player_list[i].length;j++)
            {
                let p = req_match.player_list[i][j]
                points_data[p.player_index]= p.points 
            }
        }
        // now gathering the player data 
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
        //final data 
        let final_team_list = []
        for(let p=0;p<3;p++){
            let vp_list = []
            for(let i=0;i<req_attempt.team_list[p].length;i++)
            {
                let temp_team = req_attempt.team_list[p][i]
                let points_sum = 0; 
                let final_team = sportIndex.current === 2? [[],[],[],[],[]] : [[],[],[],[]]
                for(let j=0;j<temp_team.team.length;j++)
                {
                    for(let k=0;k<temp_team.team[j].length;k++)
                    {
                        let p = {...temp_list[temp_team.team[j][k]]}
                        let pp = points_data[p.player_index]
                        if(p.player_index===temp_team.captain)
                            pp = pp*2 
                        else if(p.player_index===temp_team.vicecaptain)
                            pp = pp*1.5 
                        points_sum = points_sum + pp 
                        p.points = pp;
                        final_team[j].push(p)
                    }
                }
                vp_list.push({
                    team_number: temp_team.team_number,
                    team_points: points_sum,
                    captain: temp_team.captain,
                    final_team:final_team,
                    vicecaptain : temp_team.vicecaptain,
                    credits: temp_team.credits
                })
            }
            vp_list.sort((x,y)=>{
                if(x.team_points<y.team_points)
                return 1;
                else 
                return -1;
            })
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
                    <h4>Results</h4>
                    <button onClick={()=> navigate(`/shortcutprintauto/${match}/${attempt}`)} className='btn btn-sm btn-success' style={{fontWeight:500}}>shortcut print</button>
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
                        { finalTeamData[league].map((team)=> <Team teamData = {team} sportIndex={sportIndex.current} type={1} />)}
                        </React.Fragment>   
                        }
                        </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default ResultAuto;