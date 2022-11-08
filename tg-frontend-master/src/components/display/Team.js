import React from 'react'  


const Team = (props)=>{
    let get_name= function(name)
    {
        let dp = name+''
        let s=dp.split(" ")
        if(s.length>1)
        {
            return `${s[0].charAt(0)} ${s[1].substring(0,5)}`
        }
        return s[0].substring(0,6)
    }
    let get_row = (row,index)=>{
        let result = row.map((player)=>{
            return (
                    <div className='player-style'>

                    <img className='my-player-image' src={player.image}  alt="player"/>
                    { props.sportIndex === 2? 
                    <React.Fragment>
                    {player.player_index === props.teamData.captain? <span className='captain'>sp</span> : null}
                    {player.player_index === props.teamData.vicecaptain? <span className='vice-captain'>pp</span> : null}
                    </React.Fragment>
                     : 
                     <React.Fragment>
                    {player.player_index === props.teamData.captain? <span className='captain'>c</span> : null}
                    {player.player_index === props.teamData.vicecaptain? <span className='vice-captain'>vc</span> : null}
                    </React.Fragment>
                    }
                    
                    <span className={player.team_index===0? 'player-name-white' : 'player-name-black'}>{get_name(player.name)}</span>
                    <span className='player-info'>{props.type === 0? `${player.credits} Cr`: `${player.points} PTS`}</span>
                    </div>
            );
        })
        return (
            <div className='my-row layout-style'>
                {result}
            </div>
        ); 
    }
    let get_class = ()=>{
        if(props.sportIndex === 0)
        return 'cricket-bg my-team'
        else if(props.sportIndex === 1)
        return 'football-bg my-team'
        else if(props.sportIndex=== 2) 
        return 'basketball-bg my-team'
        else 
        return 'kabaddi-bg my-team'
    }
    return (
        <React.Fragment>
        <div className='team-style'>
            <div className='team-top'>
                <h6>Team No : {props.teamData.team_number}</h6>
                {props.type === 1? <h6>Points : {props.teamData.team_points}</h6> : null }
                <h6>Credits : {props.teamData.credits}</h6>
            </div>
            <div className={get_class()}>
                {props.teamData.final_team.map((row,index)=> get_row(row,index) )}
            </div>
        </div>
        </React.Fragment>
    );
}

export default Team;