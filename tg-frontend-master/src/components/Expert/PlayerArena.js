import React,{useState,useEffect} from 'react'  
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'
import { toast } from 'react-toastify'

const PlayerArena = (props)=>{
    const [active,setActive] = useState(false)
    let limit=[11,11,8,7]
    useEffect(()=>{

    })
    let shortcutName = (n)=>{
        let arr = n.split(' ')
        let name =''
        if(arr.length>=3)
            name = arr[0][0]+' '+arr[1][0]+' '+arr[2]
        else if(arr.length===2)
            name = arr[0][0]+' '+arr[1]
        else 
            name = arr[0]
        name = name + '          '
        name = name.substring(0,10)
        let temp = 0
        for(let i=name.length-1;i>=0;i--)
        {
            if(name[i]===' ')
            temp++
            else 
                break; 
        }
        if (temp === 6)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 5)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 4)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 3)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 2)
        return (<span>{name}&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 1)
        return (<span>{name}&nbsp;</span>);
        else 
        return (<span>{name}</span>);
    }
    // color:#eca048;
    let handlePlayer = ()=>{
        //console.log(props.teamPlayer)
        let temp = [...props.teamPlayer]
        if(active === true)
        {
            let vp = temp[props.player.role].indexOf(props.player.player_index)
            if(vp!== -1)
            {
                let kvp = temp[props.player.role]
                kvp.splice(vp,1)
                temp[props.player.role] = kvp
                setActive(false)
                if(props.captain === props.player.player_index) 
                    props.setCaptain(-1)
                if(props.vicecaptain === props.player.player_index) 
                    props.setVicecaptain(-1)
                props.setTotalCredit(props.totalCredit-props.player.credits)
                let new_list = [...props.typeCount]
                new_list[props.player.role]--;
                props.setTypeCount(new_list)
                props.setTeamPlayer([...temp])
                if(props.player.team_index === 0)
                    props.setLeftTeam(props.leftTeam-1)
                if(props.player.team_index === 1)
                    props.setRightTeam(props.rightTeam-1)

            }
        }
        else 
        {
            let vp = temp[props.player.role].indexOf(props.player.player_index)
            if(vp=== -1)
            {
                // checking stuff here 
                
               // count 
                let cnt=0;
                for(let i=0;i<props.typeCount.length;i++)
                    cnt = cnt + props.typeCount[i]
                if(cnt=== limit[props.sportIndex])
                {
                    toast.warning(`Already Selected ${limit[props.sportIndex]} players!`,{position:'top-center'})
                    return;
                }
                // credit
                if(props.totalCredit+props.player.credits>100)
                {
                    toast.warning('Credit exceeding 100!',{position:'top-center'})
                    return;
                }
                //paritision 
                //console.log(props.player)
                if(props.leftTeam===7 && props.player.team_index === 0)
                {
                    toast.warning('Maximum 7 players only allowed from one team!',{position:'top-center'})
                    return;
                }
                if(props.rightTeam===7 && props.player.team_index === 1)
                {
                    toast.warning('Maximum 7 players only allowed from one team!',{position:'top-center'})
                    return;
                }
                


                temp[props.player.role].push(props.player.player_index)
                setActive(true)
                props.setTotalCredit(props.totalCredit+props.player.credits)
                let new_list = [...props.typeCount]
                new_list[props.player.role]++;
                props.setTypeCount(new_list)
                props.setTeamPlayer([...temp])
                if(props.player.team_index === 0)
                    props.setLeftTeam(props.leftTeam+1)
                if(props.player.team_index === 1)
                    props.setRightTeam(props.rightTeam+1)
            }
        }
    }
    let handleCaptain = ()=>{
        props.setCaptain(props.player.player_index)
        return;
    }
    let handleVicecaptain = ()=>{
        if(props.captain === -1)
        {
            toast.warning('Select captain first!',{position:'top-center'})
            return;
        }
        if(props.captain === props.player.player_index)
        {
            toast.warning('Cannot Select one player for both C and VC',{position:'top-center'})
            return;
        }
        props.setVicecaptain(props.player.player_index)
        return;
    }
    return (
        <React.Fragment>
        <div  className={ active ? "player-container player-orange" : "player-container"}>
            <div onClick={ ()=> handlePlayer() } className="player-item-one d-flex justify-content-start align-items-center">
                <div  style={{position:'relative'}}>
                <img className="player-image" src={props.player.image} alt="player" />   
                <span className={ props.player.team_index === 0? "badge badge-left-team p-team" : "badge badge-right-team p-team"}>{props.player.team_name}</span>  
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center">
                    <span className="bobby-name">{shortcutName(props.player.name)}</span>
                    <span className="bobby-percentage">credits: {props.player.credits} cr</span>
                    {props.player.playing === 1? <span className="bobby-percentage" style={{color:"green"}}>• Playing</span> : null}
                </div>
            </div>
            <div style={{fontWeight:500,flexGrow:1}}>
            <table>
            <tr>
            {active ? 
                <React.Fragment>
                    <td className='player-table'>
                        <div onClick={()=> handleCaptain()} style={{cursor:'pointer'}} className={`round ${props.captain === props.player.player_index? 'captain-ac' : '' }`}>
                                C
                        </div>
                    </td>
                    <td className='player-table'>
                        <div onClick={()=> handleVicecaptain()} style={{cursor:'pointer'}} className={`round ${props.vicecaptain === props.player.player_index? 'vicecaptain-ac' : '' }`}>
                            VC
                        </div>
                    </td>
                </React.Fragment>
            :
            null
            }
            <td className='player-table'>
                <div  style={{fontWeight:500}} onClick={ ()=> handlePlayer() }>
                    { active ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> 
                    : 
                    <MdAddCircleOutline size={20} style={{color:'green'}} /> 
                    } 
                </div>
            </td>
            </tr>
            </table>
            </div>
     
        </div>
        </React.Fragment>
    );
}

export default PlayerArena;