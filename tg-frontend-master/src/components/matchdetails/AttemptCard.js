import React,{useState} from 'react' 
import { useNavigate } from 'react-router';
import {MdRadioButtonUnchecked , MdRadioButtonChecked , MdIosShare , MdInsertChart} from 'react-icons/md'



const AttemptCard = (props)=>{
    
    const match_time = new Date(props.attempt.time).getTime();
    const navigate = useNavigate()
    
    let now = new Date().getTime();
    let distance = now-match_time;
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
 
    let get_generation = (type,attempt)=>{
        if(type === 0)
            return 'Smart Section'
        else if(type === 1)
            return 'Grand league Section'
        else if(type === 2)
            return 'Advanced Section'
        else if(type === 4)
            return 'Expert Prediction'
        else if(type === 99)
            return attempt.shortcut
        else 
            return 'Auto Create'
    }

    let handleTeam = (type)=>{
        if(type==='normal')
        {
            navigate(`/display/${props.matchId}/${props.attempt.id}/9/9`)
            return 
        }
        else 
        { 
            navigate(`/displayauto/${props.matchId}/${props.attempt.id}`)
        return 
        }
    }
    let handleResult = (type)=>{
        if(type==='normal')
        {
            navigate(`/result/${props.matchId}/${props.attempt.id}`)
            return 
        }
        else 
        { 
            navigate(`/resultauto/${props.matchId}/${props.attempt.id}`)
        return 
        }
    }

    let handleAttempt = ()=>{
        let temp = [...props.attemptArray]
        if(temp[props.attempt.id] === 0)
            temp[props.attempt.id] =1; 
        else 
            temp[props.attempt.id]=0; 
        props.setAttemptArray(temp);
    }
    let handleShareStuff = ()=>{
        // console.log(props.attempt)
        let player_data = []
        for(let i=0;i<70;i++)
        {
            player_data.push(null)   
        }
        for(let i=0;i<props.attempt.player_list.length;i++)
        {
            for(let j=0;j<props.attempt.player_list[i].length;j++)
            {
                let p = props.attempt.player_list[i][j] 
                player_data[p.player_index] = p
            }
        }
        // now taking the teams stuff 
        let req_teams = [] 
        for(let i=0;i<props.attempt.team_list.length;i++)
        {
            let vp_team = props.attempt.team_list[i] 
            let temp_team = [] 
            for(let j=0;j<vp_team.team.length;j++)
                temp_team.push([]) 
            // doing more stuff here 
            for(let j=0;j<vp_team.team.length;j++)
            {
                for(let k=0;k<vp_team.team[j].length;k++)
                {
                    temp_team[j].push({
                        player_index: vp_team.team[j][k],
                        credits:   player_data[vp_team.team[j][k]].credits
                    })
                }
            }
            req_teams.push({
                team_number: i+1, 
                captain: vp_team.captain, 
                vicecaptain: vp_team.vicecaptain, 
                credits: vp_team.credits, 
                team: temp_team
            })
        }
        props.setPrimeTeamData(req_teams)
        navigate(`/postprime/${props.matchId}`)
        return
    }

    let handleReportStuff = ()=>{
        navigate(`/report/${props.matchId}/${props.attempt.id}`)
        return;
    }

    return (
        <React.Fragment>
            <div className="match-card pb-2">
                <div className="d-flex justify-content-between border-bottom" style={{marginLeft:10,marginRight:10}}>
                    <span className="series-name">{get_generation(props.attempt.generation_type,props.attempt)}</span>
                    <span class="lineups">{timeString} ago</span>
                </div> 
                <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
               {
                   props.primeAdmin === true? 
                    <React.Fragment>
                    {
                        props.attemptArray[props.attempt.id] === 0? 
                        <MdRadioButtonUnchecked onClick={()=> handleAttempt()} size={20} style={{marginLeft:10,marginRight:10}}  />
                        : 
                        <MdRadioButtonChecked onClick={()=>handleAttempt()} size={20} style={{marginLeft:10,marginRight:10}}  />
                    }
                    </React.Fragment>
                   : null
               }
                    <div className="text-center" style={{marginLeft:10,flexGrow:1,marginRight:10}}>
                        <h4>Number of Teams : {props.attempt.number_of_teams}</h4>
                        <div className='d-flex justify-content-around align-items-center'>
                                <button onClick={()=> handleTeam(props.attempt.type)} className='btn btn-primary btn-sm'>See Teams</button>
                                {
                                    props.status !== 0? 
                                    <button onClick={()=> handleResult(props.attempt.type)} className='btn btn-success btn-sm'>See Results</button>
                                    :
                                    null 
                                }
                        </div>
                    </div>
                {/*this is for sharing stuff*/}
                { props.primeAdmin === true? 
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <MdIosShare onClick={()=> handleShareStuff()} size={20} style={{marginLeft:10,marginRight:10}}  />
                        <MdInsertChart size={20} onClick={()=> handleReportStuff()} style={{marginLeft:10,marginRight:10,marginTop:10}} />
                    </div>
                    : 
                    null 
                }
                </div>
               
            </div>
        </React.Fragment>
    );
}

export default AttemptCard;