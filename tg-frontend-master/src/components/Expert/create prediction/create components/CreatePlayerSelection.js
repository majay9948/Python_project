import React,{useState,useEffect} from 'react' 
import { MdWest, MdRemoveCircleOutline , MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import CreatePlayer from './CreatePlayer';
// 0 -> playing 11
// 1 -> fixed 
// 2 -> captain 
// 3 -> vice captain
const CreatePlayerSelection = (props)=>{

    let [firstActive,setFirstActive] = useState([1,0])
    let [leftSideTeam,setLeftSideTeam] = useState(null)
    let [rightSideTeam,setRightSideTeam] = useState(null)
    let [leftSelectedList,setLeftSelectedList] = useState([])
    let [rightSelectedList,setRightSelectedList] = useState([])
    let [leftRoleCount,setLeftRoleCount] = useState([0,0,0,0])
    let [rightRoleCount,setRightRoleCount] = useState([0,0,0,0])
    let [leftTeamCount,setLeftTeamCount] = useState(0)
    let [rightTeamCount,setRightTeamCount] = useState(0)
    let handleFirstActive = (fa)=>{
        let temp = [0,0]
        temp[fa] = 1
        setFirstActive(temp)
    }
    let t_name = [
        'Wicket Keeper',
        'Batsman',
        'All Rounder',
        'Bowler'
    ]
    let type_name = [
        'WK','BAT','ALL','BOWL'
    ]
    // making left and right stuff here 
    useEffect(()=>{
        let left_list = [[],[],[],[]]
        let right_list = [[],[],[],[]]
        if(props.playerList === null || props.playerList === undefined) return
        for(let i=0;i<props.playerList.length;i++)
        {
            for(let j=0;j<props.playerList[i].length;j++)
            {
                let p = props.playerList[i][j]
                if(p.team_index === 0)
                    left_list[p.role].push({...p})
                else
                    right_list[p.role].push({...p})
            }
        }
        setLeftSideTeam(left_list)
        setRightSideTeam(right_list)
    },[])

    let handleAddTeam = ()=>{
        // checking stuff here 
        let data = {
            leftSideTeam: leftSelectedList,
            rightSideTeam: rightSelectedList
        }
        if(props.type === 0)
        {
            if(leftTeamCount !== 11 || rightTeamCount !== 11)
            {
                toast.warning('Playing 11 should have 11 players each!',{position:'top-center'})
                return;
            }
            props.setRequiredData(data)
            toast.success('Players Data added!',{position:'top-center'})
            handleBack()
            return;
        }
        else if(props.type === 1)
        {
            let a = leftRoleCount[0]+rightRoleCount[0]
            let b = leftRoleCount[1]+rightRoleCount[1]
            let c = leftRoleCount[2]+rightRoleCount[2]
            let d = leftRoleCount[3]+rightRoleCount[3]
            if(leftTeamCount + rightTeamCount > 8 || leftTeamCount>7 || rightTeamCount > 7 || a>4 || b>6 || c>4 || d>6)
            {
                toast.warning('Too many fixed Players!',{position:'top-center'})
                return;
            }
            props.setRequiredData(data)
            toast.success('Players Data added!',{position:'top-center'})
            handleBack()
            return;
        }
        else if(props.type === 2)
        {
            if(leftTeamCount+rightTeamCount < 1 || leftTeamCount > 11 || rightTeamCount > 11)
            {
                toast.warning('Invalid Captain selection!',{position:'top-center'})
                return; 
            }
            props.setRequiredData(data)
            toast.success('Player Data added!',{position:'top-center'})
            handleBack()
            return;
        }
        else 
        {
            if(leftTeamCount+rightTeamCount < 1 || leftTeamCount > 11 || rightTeamCount > 11)
            {
                toast.warning('Invalid Vice Captain selection!',{position:'top-center'})
                return; 
            }
            props.setRequiredData(data)
            toast.success('Player Data added!',{position:'top-center'})
            handleBack()
            return;
        }
        
    }
    let handleBack = ()=>{
        props.setTemplate(!props.template)
    }

    return (
        <React.Fragment>
        <div style={{marginTop:10,marginBottom: 10,border:"1px solid lightgray",borderRadius:0}}> 
            <div className='text-center' style={{fontWeight:500,marginTop:5,marginBottom:10,marginLeft:5}}><MdWest size={20} style={{float:'left'}} onClick={()=> handleBack() } />Select Playing11<button class="btn btn-sm btn-primary" style={{float:'right',marginRight:5}} onClick={()=> handleAddTeam()}>Add</button></div> 
            <div className="analytic-container">
                <div className="analytic-item">
                    <div onClick={()=>handleFirstActive(0)} className={firstActive[0]===1? 'analytic-sub-item player-orange d-flex align-items-center justify-content-center' : 'analytic-sub-item d-flex align-items-center justify-content-center'}> 
                        <img className='kvp-icon' src={props.leftImage} alt="left" />
                        <span>{props.leftName}&nbsp;</span>{ firstActive[0] ===1 ? 
                            <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : 
                            <MdAddCircleOutline size={20} style={{color:'green'}} />} 
                    </div>
                    <div onClick={()=>handleFirstActive(1)}  className={firstActive[1]===1? 'analytic-sub-item player-orange d-flex align-items-center justify-content-center' : 'analytic-sub-item d-flex align-items-center justify-content-center'}>
                    <img className='kvp-icon' src={props.rightImage} alt="right" />
                    <span>{props.rightName} &nbsp;</span>{ firstActive[1] ===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                </div>
            </div>
            {/* count stuff here */}
            <nav class=" container d-flex justify-content-around top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0,backgroundColor:'white'}}>
                {type_name.map((type,index)=>
                    <div onClick={()=>{}} className='sport-icon'>
                    <h6 >{type}</h6>
                    <h4 style={{color:'black'}}>{firstActive[0]===1 ? leftRoleCount[index] : rightRoleCount[index] }</h4>
                </div>)
                }
                <div onClick={()=>{}} className='sport-icon'>
                    <h6 style={{color:'blue'}} >Total</h6>
                    <h4 style={{color:'black'}}>{firstActive[0]===1? leftTeamCount : rightTeamCount}</h4>
                </div>
            </nav>
            {/* stuff here */}
            {firstActive[0] === 1? 
                <React.Fragment>
                    { leftSideTeam && leftSideTeam.map( (role_list,val) => 
                        <React.Fragment> 
                        <div className='section-info'>
                            <span className='section-primary'>{t_name[val]}</span>
                        </div>
                        {role_list.map( p=> 
                            <CreatePlayer 
                                key={p.player_index}
                                player={p} 
                                selectedList={leftSelectedList}
                                setSelectedList = {setLeftSelectedList}
                                roleCount = {leftRoleCount}
                                setRoleCount = {setLeftRoleCount}
                                teamCount = {leftTeamCount}
                                setTeamCount = {setLeftTeamCount}
                                 />
                            )}
                        </React.Fragment>
                        )}
                </React.Fragment>
                :
                <React.Fragment>
                {rightSideTeam && rightSideTeam.map( (role_list,val) => 
                    <React.Fragment> 
                    <div className='section-info'>
                        <span className='section-primary'>{t_name[val]}</span>
                    </div>
                    {role_list.map( p=> 
                        <CreatePlayer 
                            key={p.player_index}
                            player={p}
                            selectedList = {rightSelectedList}
                            setSelectedList = {setRightSelectedList}
                            roleCount = {rightRoleCount}
                            setRoleCount = {setRightRoleCount}
                            teamCount = {rightTeamCount}
                            setTeamCount = {setRightTeamCount}
                            />
                        )}
                    </React.Fragment>
                    )}
                </React.Fragment>
            }

        </div>
        </React.Fragment>
    );
}
export default CreatePlayerSelection;