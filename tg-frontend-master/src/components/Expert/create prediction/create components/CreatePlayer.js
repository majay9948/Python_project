import React,{useState,useEffect} from 'react'  
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'
import { toast } from 'react-toastify'

const CreatePlayer = (props)=>{
    let [active,setActive] = useState(false)

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
    useEffect(()=>{
        if(props.selectedList.includes(props.player.player_index))
            setActive(true)
    },[])
    let handleClick = ()=>{
        let temp = [...props.selectedList]
        let tempRole = [...props.roleCount]
        let tempCount = props.teamCount
        if(active)
        {
            let index = temp.indexOf(props.player.player_index)
            temp.splice(index,1)
            setActive(false)
            props.setSelectedList(temp)
            tempRole[props.player.role]--;
            tempCount--;
        }
        else{
            temp.push(props.player.player_index)
            setActive(true)
            props.setSelectedList(temp)
            tempRole[props.player.role]++;
            tempCount++;
        }
        props.setTeamCount(tempCount)
        props.setRoleCount(tempRole)
    }
    return (
        <React.Fragment>
        <div  className="player-container">
            <div onClick={ ()=> handleClick() } className="player-item-one d-flex justify-content-start align-items-center">
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
            <td className='player-table'>
                <div  style={{fontWeight:500}} >
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

export default CreatePlayer;