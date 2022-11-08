import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router";
import NavBarTwo from '../navbar/NavBarTwo';
import { BsToggle2Off, BsToggle2On , BsXCircleFill} from 'react-icons/bs'
import {MdFilterList , MdClose, MdCheck , MdCheckBoxOutlineBlank , MdCheckBox , 
    MdRadioButtonUnchecked , MdRadioButtonChecked , MdOutlineIosShare,  
    MdOutlineRestartAlt } from 'react-icons/md'
import FilterTeam from './FilterTeam'
import { toast } from 'react-toastify';
import FilterTemplate from './Filter/FilterTemplate'


let DisplayNormal = (props)=>{
    let navigate = useNavigate()
    let [filter,setFilter] = useState(0)
    let sportIndex = useRef(null)
    const {match,attempt,ftype,fvalue} = useParams()
    let [finalTeamData,setFinalTeamData] = useState([])
    let [filterPlayerList,setFilterPlayerList] = useState([])
    let [leftName,setLeftName] = useState(null)
    let [rightName,setRightName] = useState(null)
    let [filterData,setFilterData] = useState([])
    let [selection,setSelection] = useState(false)
    let [selectedTeams,setSelectedTeams] = useState([])
    let [selectAll,setSelectAll] = useState(false)
    let [shortcut,setShortcut] = useState(null)
    let [storeBox,setStoreBox] = useState(false)
    let [filterCount,setFilterCount] = useState(0)

    // filter array which handles the complete filtering stuff 
    //filtering stuff 
    // first - player Selection
    // second - captain Selection
    // thrid - vice captain selection 
    // four - Partision Strategy 
    // fifith  - Team Credits 
    // sixth - combination strategy 
    let [firstFilter,setFirstFilter] = useState(null)
    let [loader,setLoader] = useState(false)
    let [secondFilter,setSecondFilter] = useState(null)
    let [thirdFilter,setThirdFilter] = useState(null)
    let [fourthFilter,setFourthFilter] = useState(null)
    let [fifthFilter,setFifthFilter] = useState(null)
    let [sixthFilter,setSixthFilter] = useState(null)
    let [filterIndexArray,setFilterIndexArray] = useState([-1,-1,-1,-1,-1,-1])

    //constant values 
    let cs = [
        [
            [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],
            [2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],
            [3,3,2,3],[3,4,1,3],[3,3,1,4],
            [4,3,1,3]
        ],
        [ 
            [1,4,5,1],[1,5,4,1],[1,5,3,2],[1,4,4,2],[1,3,4,3],[1,4,3,3],[1,3,5,2]
        ],
        [
            [1,1,1,1,4],[1,1,1,2,3],[1,1,1,3,2],[1,1,1,4,1],[1,1,2,1,3],[1,1,2,2,2],[1,1,2,3,1],[1,1,3,2,1],[1,1,4,1,1],[1,2,1,1,3],[1,2,1,2,2],[1,2,2,1,2],[1,2,2,2,1],[1,2,3,1,1],[1,3,1,1,2],[1,3,1,2,1],[1,3,2,1,1],[1,4,1,1,1],
            [2,1,1,1,2],[2,1,1,1,3],[2,1,1,2,2],[2,1,1,3,1],[2,1,2,1,2],[2,1,2,2,1],[2,1,3,1,1],[2,2,1,1,2],[2,2,1,2,1],[2,2,2,1,1],[2,3,1,1,1],
            [3,1,1,1,2],[3,1,1,2,1],[3,1,2,1,1],[3,2,1,1,1],
            [4,1,1,1,1]
         ],
         [
            [2,2,3],[3,2,2],[3,1,3],[4,1,2],[4,2,1]
        ]
    ]

    let ps = [
        [
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ],
    [
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ],
    [
        [3,5],
        [4,4],
        [5,3]
    ],
    [
        [2,5],
        [3,4],
        [4,3],
        [5,2]
    ]
    ]


    let get_player_list = ()=>{
        if(sportIndex.current===2)
            return [[],[],[],[],[]]
        else if(sportIndex.current===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }
    useEffect(()=>{
      
        if(props.reload === null)
        {
            navigate('/')
            return
        }

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
        setLeftName(req_match.left_name)
        setRightName(req_match.right_name)
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
        let filterTempPlayerList = []
        for(let i=0;i<req_attempt.player_list.length;i++)
        {
            for(let j=0;j<req_attempt.player_list[i].length;j++)
            {
                let p = req_attempt.player_list[i][j]
                temp_list[p.player_index] = p;
                if(p.team_index === 0)
                    filterTempPlayerList.push({...p})
            }
        }
        for(let i=0;i<req_attempt.player_list.length;i++)
        {
            for(let j=0;j<req_attempt.player_list[i].length;j++)
            {
                let p = req_attempt.player_list[i][j]
                if(p.team_index === 1)
                    filterTempPlayerList.push({...p})
            }
        }
        // assigning to that stuff 
        setFilterPlayerList(filterTempPlayerList)
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
        if(parseInt(ftype) !== 9 && parseInt(fvalue)!== 9)
        {
            let dp = [...filterIndexArray]
            dp[parseInt(ftype)] = parseInt(ftype)
            if(parseInt(ftype)=== 0){
                setFirstFilter({
                    filterType: 0, 
                    presentList: [parseInt(fvalue),], 
                    absentList: []
                })
            }
            else if(parseInt(ftype)=== 1)
            {
                setSecondFilter({
                    filterType: 1, 
                    presentList: [parseInt(fvalue),]
                })                                                                                                                                                                                                                                         
            }
            else if(parseInt(ftype) === 2)
            {
                setThirdFilter({
                    filterType: 2, 
                    presentList: [parseInt(fvalue),]
                }) 
            }
            else if(parseInt(ftype)=== 3)
            {
                setFourthFilter({
                    filterType: 3, 
                    presentList: [ps[sportIndex.current][parseInt(fvalue)],]
                }) 
            }
            else if(parseInt(ftype)=== 4)
            {
                setFifthFilter({
                    filterType: 4, 
                    presentList: [parseFloat(fvalue),]
                }) 
            }
            else if(parseInt(ftype)=== 5)
            {
                setSixthFilter({
                    filterType: 5, 
                    presentList: [cs[sportIndex.current][parseInt(fvalue)],]
                }) 
            }
            console.log(dp)
            setFilterIndexArray(dp)
        }
        setLoader(true)
    },[])

    useEffect(()=>{
      //  console.log(thirdFilter)
        let tempList = [null,null,null,null,null,null]
        tempList[0] = firstFilter 
        tempList[1] = secondFilter 
        tempList[2] = thirdFilter 
        tempList[3] = fourthFilter 
        tempList[4] = fifthFilter 
        tempList[5] = sixthFilter 
        let cnt =0;
        for(let i=0;i<6;i++)
            if(tempList[i]!== null) cnt++;
        setFilterCount(cnt)
        if(loader === true){
            let tempData = [...finalTeamData] 
            for(let i=0;i<tempList.length;i++)
            {
                if(tempList[i] !== null)
                {
                    let p = tempList[i] 
                    if(p.filterType === 0)
                    {
                        tempData = handleFirstFilter(tempData,p)
                    }
                    else if(p.filterType === 1)
                    {
                        tempData = handleSecondFilter(tempData,p);
                    }
                    else if(p.filterType === 2)
                    {
                        tempData = handleThirdFilter(tempData,p);
                    }
                    else if(p.filterType === 3)
                    {
                        tempData = handleFourthFilter(tempData,p);
                    }
                    else if(p.filterType === 4)
                    {
                        tempData = handleFifthFilter(tempData,p);
                    }
                    else if(p.filterType === 5)
                    {
                        tempData = handleSixthFilter(tempData,p);
                    }
                }
            }
            setFilterData(tempData);
        }
    },[firstFilter,secondFilter,thirdFilter,fourthFilter,fifthFilter,sixthFilter,loader])


    let handleFirstFilter = (tempData,p)=>{
        let removeTeamNumber = []
        for(let i=0;i<tempData.length;i++)
        {
            let t = tempData[i] 
            let result = playerCheck(t.final_team,p)
            if(result === false)
                removeTeamNumber.push(t.team_number)
        }
        tempData = tempData.filter(t => !removeTeamNumber.includes(t.team_number))
        return tempData; 
    }
    let handleSecondFilter = (tempData,p)=>{
        let removeTeamNumber = []
        for(let i=0;i<tempData.length;i++)
        {
            let t = tempData[i] 
            let result = p.presentList.includes(t.captain)
            if(result === false)
                removeTeamNumber.push(t.team_number)
        }
        tempData = tempData.filter(t => !removeTeamNumber.includes(t.team_number))
        return tempData; 
    }
    let handleThirdFilter = (tempData,p)=>{
        let removeTeamNumber = []
        for(let i=0;i<tempData.length;i++)
        {
            let t = tempData[i] 
          //  console.log(t)
            let result = p.presentList.includes(t.vicecaptain)
            if(result === false)
                removeTeamNumber.push(t.team_number)
        }
        tempData = tempData.filter(t => !removeTeamNumber.includes(t.team_number))
        return tempData; 
    }
    let handleFourthFilter = (tempData,p)=>{
        let removeTeamNumber = []
        for(let i=0;i<tempData.length;i++)
        {
            let t = tempData[i] 
            let result = checkPartision(t.final_team,p);
            if(result === false)
                removeTeamNumber.push(t.team_number)
        }
        tempData = tempData.filter(t => !removeTeamNumber.includes(t.team_number))
        return tempData; 
    }
    let handleFifthFilter = (tempData,p)=>{
        let removeTeamNumber = []
        for(let i=0;i<tempData.length;i++)
        {
            let t = tempData[i] 
            let result = p.presentList.includes(t.credits)
            if(result === false)
                removeTeamNumber.push(t.team_number)
        }
        tempData = tempData.filter(t => !removeTeamNumber.includes(t.team_number))
        return tempData; 
    }

    let handleSixthFilter = (tempData,p)=>{
        let removeTeamNumber = []
        for(let i=0;i<tempData.length;i++)
        {
            let t = tempData[i] 
            let result = checkCombination(t.final_team,p);
            if(result === false)
                removeTeamNumber.push(t.team_number)
        }
        tempData = tempData.filter(t => !removeTeamNumber.includes(t.team_number))
        return tempData; 
    }

    let checkCombination = (team,p)=>{
        let first = []
        for(let i=0;i<team.length;i++)
            first.push(team[i].length) 
        for(let i=0;i<p.presentList.length;i++)
        {
            let cnt =0,size = first.length;
            for(let j=0;j<size;j++)
            {
                if(first[j] === p.presentList[i][j])
                    cnt++;
            }
            if(cnt === size)
                return true;
        }
        return false;
    }

    let checkPartision = (team,p)=>{
        let left=0,right=0; 
        for(let i=0;i<team.length;i++)
        {
            for(let j=0;j<team[i].length;j++)
            {
                let p = team[i][j] 
                if(p.team_index === 0)
                    left++; 
                else 
                    right++;
            }
        }
        for(let i=0;i<p.presentList.length;i++)
        {
            if(p.presentList[i][0] === left && p.presentList[i][1] === right)
                return true; 
        }
        return false;
    }

    let playerCheck = (team,firstFilter)=>{
        let player_list = []
        for(let i=0;i<team.length;i++)
        {
            for(let j=0;j<team[i].length;j++)
            {
                let p = team[i][j]
                player_list.push(p.player_index) 
            }
        }
        if(firstFilter!== null)
        {
            for(let i=0;i<firstFilter.absentList.length;i++)
            {
                if(player_list.includes(firstFilter.absentList[i]))
                {
                    return false;
                }
            }
            for(let i=0;i<firstFilter.presentList.length;i++)
            {
                if(!player_list.includes(firstFilter.presentList[i]))
                {
                    return false;
                }
            }
        }
        return true 
    }

    let handleSelectionOn = ()=>{
        setSelection(true)
        toast.success('Select teams and store them separately!',{position:'top-center'})
    }

    let handleShortcut = (e)=>{
        setShortcut(e.target.value)
    }

    let handleSelectionOff = ()=>{
        setSelection(false)
        setSelectedTeams([])
        setSelectAll(false)
    }

    let handleReset = ()=>{
        setSelectedTeams([])
    }
    let handleSelectAll = ()=>{
        if(selectAll === true)
        {
            setSelectAll(false)
            return 
        }
        let temp = []
        for(let i=0;i<filterData.length;i++)
        {
            temp.push(filterData[i].team_number)
        }
        setSelectAll(true)
        setSelectedTeams(temp)
    }

    let handleStoreBoxOpen = ()=>{
        if(selectedTeams.length===0)
        {
            toast.warning('Select teams to Separate!',{position:'top-center'})
            return 
        }
        setStoreBox(true) 
    }
    let handleStoreBoxClose = ()=>{
        setStoreBox(false) 
        setShortcut(null) 
    }

    let handleStoreTeams = ()=>{
        console.log(shortcut)
        if(shortcut === null || shortcut === '')
        {
            toast.error('Invalid Teams Name!',{position:'top-center'})
            return 
        }
        if(shortcut.length>40)
        {
            toast.warning('Teams name is too long!',{position:'top-center'})
            return 
        }
        if(selectedTeams.length === 0)
        {
            toast.warning('Select teams to store!',{position:'top-center'})
            return 
        }
        // get teams data 
        let data = JSON.parse(localStorage.getItem('tgk_data'))
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
        if(req_match!==null)
        {
            let req_attempt = null 
            for(let i=0;i<req_match.attempts.length;i++)
            {
                if(attempt.toString() === req_match.attempts[i].id.toString())
                {
                    req_attempt = req_match.attempts[i]
                }
            }
            if(req_attempt!==null)
            {
                let newAttempt = {...req_attempt}
                newAttempt.generation_type = 99
                newAttempt.id = req_match.attempts.length 
                newAttempt.number_of_teams = selectedTeams.length 
                newAttempt.time = Date.now()
                newAttempt.shortcut = shortcut
                let new_list = []
                let vp =1;
                //setting up the teams 
                for(let i=0;i<req_attempt.team_list.length;i++)
                {
                    if(selectedTeams.includes(req_attempt.team_list[i].team_number))
                    {
                        let dp = {...req_attempt.team_list[i]}
                        dp.team_number = vp
                        new_list.push(dp)
                        vp++;
                    }
                }
                if(new_list.length !== selectedTeams.length)
                {
                    toast.warning('some thing went wrong!',{position:'top-center'})
                    return 
                }
                newAttempt.team_list = new_list 
                for(let i=0;i<data[sportIndex.current].length;i++)
                {
                    if(data[sportIndex.current][i].id.toString() === match.toString())
                    {
                        data[sportIndex.current][i].attempts.push(newAttempt)
                    }
                }
                localStorage.setItem('tgk_data',JSON.stringify(data))
                toast.success('Teams Stored Successfully!',{position:'top-center'})
                setStoreBox(false)
                return 
            }
        }
        toast.error('Failed while storing teams!',{position:'top-center'})
        return
    }


    return (
        <React.Fragment>
        {
            true ? 
            <React.Fragment>
                <NavBarTwo navigate = {navigate} />
                <div style={{backgroundColor:'white'}}>
                <nav class=" container d-flex justify-content-around top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0}}>
                    <button onClick={()=> navigate(`/shortcutprintnormal/${match}/${attempt}`) } className='btn btn-sm btn-success' style={{fontWeight:500}}>Shortcut Print</button>
                    <button onClick={()=> navigate(`/analytics/${match}/${attempt}`) } className='btn btn-sm btn-danger' style={{fontWeight:500}}>Analytics</button>
                    <button onClick={()=> window.print()} className='btn btn-sm btn-primary' style={{fontWeight:500}}> Print</button>
                    {props.userRole ==='customer'? null: 
                    <button onClick={()=> {navigate(`/sharesoftware/${match}/${attempt}`);return;}} className='btn btn-sm btn-success' style={{fontWeight:500}}>Share Teams</button>
                }
                </nav>
                <nav class=" container d-flex justify-content-around align-items-center top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0}}>
                   {selection === false?
                        <div className='d-flex align-items-center' onClick={()=>{ handleSelectionOn() }}>
                            <BsToggle2Off size={22} /><span style={{fontWeight:500}}>&nbsp;&nbsp;Selection</span>
                        </div>
                    : 
                        <div className='d-flex align-items-center' onClick={()=>{handleSelectionOff()}}>
                            <BsToggle2On style={{color:'green'}} size={22} /><span style={{fontWeight:500}}>&nbsp;&nbsp;Selection</span>
                        </div>
                    } 
                   {selection === true? 
                        <React.Fragment>
                            <div className="d-flex flex-column align-items-center justify-content-center" onClick={()=> {handleSelectAll()}}>
                            {selectAll? <MdCheckBox  size={22}/> : <MdCheckBoxOutlineBlank  size={22}/>}    
                                <span style={{fontSize:10}}>Select All</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center" onClick={()=>{handleReset()}}>
                                <MdOutlineRestartAlt  size={22}/>
                                <span style={{fontSize:10}}>Reset</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center" onClick={()=>{handleStoreBoxOpen()}}>
                                <MdOutlineIosShare size={22} />
                                <span style={{fontSize:10}}>separate</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <span style={{fontWeight:500}}>{selectedTeams.length}</span>
                                <span style={{fontSize:10}}>teams</span>
                            </div>
                        </React.Fragment>
                    : null}
               
                    </nav>
                {/* Team short cut name here  */}
               {storeBox === true ? 
                <nav class=" container d-flex justify-content-center flex-column align-items-center flex-wrap top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0}}>
                    <div className='d-flex align-items-center'>
                    <input type="text" name="shortcut" value={shortcut} onChange={handleShortcut} placeholder="Enter Teams Name" /> <button className="btn btn-sm btn-primary" onClick={()=>{handleStoreTeams()}} style={{marginLeft:5,fontWeight:500}}>Store Teams</button> <BsXCircleFill onClick={()=>{handleStoreBoxClose()}}  size={30} style={{color:'red',marginLeft:5}} />
                    </div>
                    <span className='text-muted'>Example name : My custom filter teams</span>
                </nav>
                : null}
                
                <div className='container' style={{maxWidth:1200,padding:8}}>

                    <div className="card mt-2 text-center">
                        <div className='card-header d-flex justify-content-between'>
                            <h4>Generated Teams</h4>
                            <div style={{position:'relative'}}>
                                <MdFilterList size={30} onClick={()=>{setFilter(1)}} /> 
                                <div style={{position:'absolute',top:-10,right:-10,backgroundColor:'red',color:'white',width:20,height:20,borderRadius:'50%',fontSize:11,display:'flex',alignItems:'center',justifyContent:'center'}}>{filterCount}</div>
                            </div>
                        </div>
                        <div className="display-team">
                            { filterData.map((team)=> <FilterTeam teamData = {team} sportIndex={sportIndex.current} type={0} selection={selection} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} teamNumber={team.team_number} />)}
                        </div>
                    </div>
                </div>
                </div>
                <div className="container" style={{maxWidth:600,padding:0,position:'fixed',top:0,display:`${filter === 1? 'block': 'none'}`}} >
                {filter === 1? 
                <FilterTemplate 
                    filter={filter}
                    setFilter={setFilter}
                    filterPlayerList = {filterPlayerList}
                    sportIndex = {sportIndex.current}
                    firstFilter = {firstFilter}
                    setFirstFilter = {setFirstFilter}
                    secondFilter = {secondFilter}
                    setSecondFilter = {setSecondFilter}
                    thirdFilter = {thirdFilter}
                    setThirdFilter = {setThirdFilter}
                    fourthFilter = {fourthFilter}
                    setFourthFilter = {setFourthFilter}
                    fifthFilter = {fifthFilter}
                    setFifthFilter = {setFifthFilter}
                    sixthFilter = {sixthFilter}
                    setSixthFilter = {setSixthFilter}
                    filterIndexArray = {filterIndexArray}
                    setFilterIndexArray = {setFilterIndexArray}
                    leftName = {leftName}
                    rightName = {rightName}
                    filterData= {filterData}
                    /> : null}
                </div>
            </React.Fragment>
            :
            null 
        }
        </React.Fragment>
    );
}

export default DisplayNormal;