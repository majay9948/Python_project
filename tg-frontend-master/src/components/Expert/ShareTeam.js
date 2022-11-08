import React,{useRef,useEffect,useState} from 'react'  
import {MdRadioButtonUnchecked , MdRadioButtonChecked} from 'react-icons/md'

const ShareTeam = (props)=>{
    let teamRef = useRef()
    let [teamActive,setTeamActive] = useState(false)
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
        return 'cricket-bg my-team '
        else if(props.sportIndex === 1)
        return 'football-bg my-team '
        else if(props.sportIndex=== 2) 
        return 'basketball-bg my-team '
        else 
        return 'kabaddi-bg my-team '
    }

    let handleClick = ()=>{
       // console.log('clicked')
        let temp = [...props.selectedTeams]
        if(teamActive === true)
        {
            teamRef.current.classList.remove('share-team-active')
            setTeamActive(false)
            let vp=temp.indexOf(props.index)
            if(vp!==-1)
            {
                temp.splice(vp,1);
            }
        }
        else 
        {
            teamRef.current.classList.add('share-team-active')
            setTeamActive(true)
            let vp = temp.indexOf(props.index)
            if(vp === -1)
            {
                temp.push(props.index)
            }
        }
        props.setSelectedTeams(temp)
    }

    return (
        <React.Fragment>
        <div className='team-style' >
            <div className='team-top'>
                <h6>Team No : {props.teamData.team_number}</h6>
                {props.type === 1? <h6>Points : {props.teamData.team_points}</h6> : null }
                <h6>Credits : {props.teamData.credits}</h6>
            </div>
            <div className={get_class()} onClick={()=> handleClick()} style={{position:'relative'}} ref={teamRef} >
                <div onClick={()=> handleClick()} style={{position:'absolute',top:7,right:12,color:'white'}}>
                    {teamActive && teamActive === true?
                        <MdRadioButtonChecked size={30} />
                        : 
                        <MdRadioButtonUnchecked  size={30} />
                    }    
                </div>
                {props.teamData.final_team.map((row,index)=> get_row(row,index) )}
            </div>
        </div>
        </React.Fragment>
    );
}

export default ShareTeam;