import React from 'react'  


const Team = (props)=>{
    let type_name = [
        ['Wicket Keeper','Batsman','Alrounder','Bowler'],
        ['Goal Keeper','Defender','Mid Fielder','Forward'],
        ['Point Guard','Shooting Gaurd','Small Forward','Power Forward','Center'],
        ['Defender','Alrounder','Raider']
    ]
    
    let get_row = (row,index)=>{
        let result = row.map((player)=>{
            return (
                    <React.Fragment>
                        { props.sportIndex === 2? 
                        <React.Fragment>
                        {player.player_index === props.teamData.captain? <li>{player.name}(sp)</li> : 
                         <React.Fragment>
                        {player.player_index === props.teamData.vicecaptain?  <li>{player.name}(pp)</li> : <li>{player.name}</li>}
                        </React.Fragment>    
                        }
                        </React.Fragment>
                         : 
                         <React.Fragment>
                        {player.player_index === props.teamData.captain? <li>{player.name}(c)</li> : 
                         <React.Fragment>
                        {player.player_index === props.teamData.vicecaptain?  <li>{player.name}(vc)</li> : <li>{player.name}</li>}
                        </React.Fragment>    
                        }
                        </React.Fragment>
                        }
                    </React.Fragment>     
            );
        })
        return (
            <React.Fragment>
            <span style={{color: 'green'}}>{type_name[props.sportIndex][index]}</span>
                {result}
            </React.Fragment>
        ); 
    }
   
    return (
        <React.Fragment>
            <div style={{textAlign:'left'}} className="border shortcut-team m-2">
                <li>Team no: {props.teamData.team_number}</li>
                <li>Team Credits: {props.teamData.credits}</li>
                {props.teamData.final_team.map((row,index)=> get_row(row,index) )}
            </div>
        </React.Fragment>
    );
}

export default Team;