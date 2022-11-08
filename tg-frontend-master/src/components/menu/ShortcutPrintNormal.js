import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router";
import NavBarTwo from '../navbar/NavBarTwo';
import STeam from './STeam'


let ShortcutPrintNormal = (props)=>{
    let navigate = useNavigate()
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
        console.log(sportIndex.current)
        console.log(req_match)
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
    return (
        <React.Fragment>
            <NavBarTwo navigate = {navigate} />
            <div style={{backgroundColor:'white'}}>
            <div className='container' style={{maxWidth:1200,padding:8}}>

                <div className="card mt-2 text-center">
                    <div className='card-header d-flex justify-content-between'>
                        <h4>Generated Teams</h4>
                        <button onClick={()=> window.print()} className='btn btn-sm btn-primary' style={{fontWeight:500}}>print</button>
                    </div>
                    <div className="display-team">
                        { finalTeamData.map((team)=> <STeam teamData = {team} sportIndex={sportIndex.current} type={0} />)}
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default ShortcutPrintNormal;