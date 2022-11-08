import React,{useState} from 'react'  


const PlayerChange = (props)=>{
    console.log(props.player)
    let [credit,setCredit] = useState(props.player.credits)
    let [percentage,setPercentage] = useState(props.player.selected_by)
    let [role,setRole] = useState(props.player.role)

    let type_name = [
        ['WK','BAT','AL','BOWL'],
        ['GK','DEF','MID','ST'],
        ['PG','SG','SF','PF','C'],
        ['DEF','ALL','RAI']
    ]
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
    let handleCredit = (e)=>{
        props.handlePlayer(props.player.player_index,props.index,e.target.value,role,percentage)
        setCredit(e.target.value)
    }
    let handleRole = (e)=>{
        props.handlePlayer(props.player.player_index,props.index,credit,e.target.value,percentage)
        setRole(e.target.value)
    }
    let handlePercentage = (e)=>{
        props.handlePlayer(props.player.player_index,props.index,credit,role,e.target.value)
        setPercentage(e.target.value)
    }
    return (
        <React.Fragment>
        <div className="player-container">
            <div className="player-item-one d-flex justify-content-start align-items-center">
                <div  style={{position:'relative'}}>
                <img className="player-image" src={props.player.image} alt="player" />   
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center">
                    <span className="bobby-name">{shortcutName(props.player.name)}</span>
                    <span className="bobby-percentage" style={{color:"green"}}>{props.player.playing === 1? '• Playing' : ''}</span>
                </div>
            </div>
            <div  style={{fontWeight:500,flexGrow:1}}>
            <input onChange={ handlePercentage } type="number" style={{width:60}} name="percentage" value={percentage} placeholder='percentage' />
            </div>
            <div  style={{fontWeight:500,flexGrow:1}}>
            <input onChange={ handleCredit } type="number" style={{width:50}} name="credit" value={credit} placeholder='credit' />
            </div>
            <div  style={{fontWeight:500,flexGrow:1}}>
                <select onChange={handleRole} name="role" value={role}>
                {type_name[props.sportIndex].map((name,index)=> <option value={index}>{name}</option>)}
                </select>
            </div>
        </div>
        </React.Fragment>
    );
}

export default PlayerChange;