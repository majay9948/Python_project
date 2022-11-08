import React from 'react'

const PlayerData = (props)=>{
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

    let role = ['WK','BAT','ALL','BOWL']

    
    let getClass = (type)=>{
        if(type === 0)
            return 'p-blue'
        else if(type === 1)
            return 'p-pink'
        else if(type === 2)
            return 'p-orange'
        else 
            return 'p-violet'
    }
    return (
        <React.Fragment>
            <div className={`prediction-player-data ${getClass(props.type)} mt-2 mb-2`}>
                <img className='prediction-player-image' src={props.data.image} />
                <div className='d-flex flex-column align-items-start'>
                    <div className='prediction-player-name'>{shortcutName(props.data.name)}</div>
                    <div className='prediction-player-role'>{role[props.data.role]}</div>
                </div>
            </div> 
        </React.Fragment>
    );
}

export default PlayerData;