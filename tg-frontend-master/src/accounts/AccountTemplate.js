import React,{useState,useEffect} from 'react'   
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'
import NotifyCard from '../api/NotifyCard'



const AccountTemplate = (props)=>{
    let [active,setActive] = useState([1,0,0])
    let [todayButton,setTodayButton] = useState(false)
    let [totalButton,setTotalButton] = useState(false)


    const [todayTotal,setTodayTotal] = useState(0)
    const [todayRegister,setTodayRegister] = useState(0)
    const [todayExtension,setTodayExtension] = useState(0)

    const [total,setTotal] = useState(0)
    const [register,setRegister] = useState(0)
    const [extension,setExtension] = useState(0)

    const [todayList,setTodayList]= useState([])
    const [totalList,setTotalList] = useState([])
    const [last7Days,setLast7Days] = useState([])

    useEffect(()=>{
        let today_complete_list = []
        let total_complete_list = []
        let week_list = []
        let today_register = 0,today_extension = 0;
        let total_register = 0,total_extension = 0;
        let today_date = new Date(Date.now())
        for(let i=0;i<7;i++)
        {
            today_date.setDate(today_date.getDate()-1)
            week_list.push({day:today_date.getDate(),month:today_date.getMonth(),year:today_date.getFullYear(),register:0,extension:0})
        }
        //real meat here 
        let final_today_date = new Date(Date.now())
        for(let i=0;i<props.data.length;i++)
        {
            let note = props.data[i]
            let temp_date = new Date(note.createdAt)
            
            //couting today stuff 
            
            if(final_today_date.getDate() === temp_date.getDate() && final_today_date.getMonth() === temp_date.getMonth() && final_today_date.getFullYear() === temp_date.getFullYear())
            {
                if(note.notifyType === 'register')
                    today_register++;
                else 
                    today_extension++;
                //today complete list 
                today_complete_list.push(note)
                
            }
            //total complete list
            total_complete_list.push(note)
            //couting total stuff
            if(note.notifyType === 'register')
                total_register++;
            else 
                total_extension++;
            
            //week data also obtained
            for(let j=0;j<7;j++)
            {
                let temp_week = week_list[j]
                if(temp_week.day === temp_date.getDate() && temp_week.month === temp_date.getMonth() && temp_week.year === temp_date.getFullYear())
                {
                    if(note.notifyType === 'register')
                        week_list[j].register = week_list[j].register + 1;
                    else 
                        week_list[j].extension = week_list[j].extension + 1;
                    break;
                }
            }
            // today complete data 
            today_complete_list.sort((x,y)=>{
                let temp1 = new Date(x.createdAt)
                let temp2 = new Date(y.createdAt)
                if(temp1<temp2)
                    return 1 
                else 
                    return -1;
            })
            // total complete data
            total_complete_list.sort((x,y)=>{
                let temp1 = new Date(x.createdAt)
                let temp2 = new Date(y.createdAt)
                if(temp1<temp2)
                    return 1 
                else 
                    return -1;
            })
        
        // passing into state variables 
        setTodayRegister(today_register)
        setTodayExtension(today_extension)
        setTodayTotal(today_register+today_extension)
        setRegister(props.registerCnt)
        setExtension(props.addPlanCnt)
        setTotal(props.totalCnt)
        setLast7Days(week_list)
        setTotalList(total_complete_list)
        setTodayList(today_complete_list)
        }
    },[props.data])
  


    let handleActive = (active_index)=>{
        if(active[active_index]===1)
            return
        setTodayButton(false)
        setTotalButton(false)
        let new_list = [...active]
        for(let i=0;i<new_list.length;i++)
        {
            if(i=== active_index)
                new_list[i] = 1 
            else 
                new_list[i] = 0
        }
        setActive(new_list)
    }
    let showToday = ()=>{
        setTodayButton(true)
        setTotalButton(false)
    }
    let showTotal = ()=>{
        setTotalButton(true)
        setTodayButton(false)
    }
    return (
        <React.Fragment>
            <div className="analytic-container">
                <div className="analytic-item">
                <div onClick={()=>handleActive(0)} className={active[0]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Account Data &nbsp;{ active[0] ===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                <div onClick={()=>handleActive(1)}  className={active[1]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Last 7 Days &nbsp;{ active[1] ===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                </div>
                <div className="analytic-item">
                    <div onClick={()=>handleActive(2)} className={active[2]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Complete Data &nbsp;{ active[2] ===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                </div>
            </div>
            {active.indexOf(1) === 0? 
            <div style={{paddingLeft:5,paddingRight:5}}>
            <div className='user-profile' >
                <h4>Accounts Data</h4>
                <hr/> 
                    <table class="table" style={{textAlign:'center'}}>
                        <thead class="thead-light">
                            <tr>
                            <th scope="col">Registered No</th>
                            <th scope="col">{props.registeredNumber}</th>
                            </tr>
                        </thead>
                    </table>
                </div>  
                <div className='user-profile' >
                <h4>Today Accounts Data</h4>
                <hr/> 
                    <table class="table" style={{textAlign:'center'}}>
                        <tbody class="thead-light">
                            <tr>
                                <th scope="col">Registered</th>
                                <th scope="col">Plan Extended</th>
                                <th scope="col">Total</th>
                            </tr>
                        </tbody>
                        <tbody class="thead-light">
                            <tr>
                                <th scope="col">{todayRegister}</th>
                                <th scope="col">{todayExtension}</th>
                                <th scope="col">{todayTotal}</th>
                            </tr>
                        </tbody>
                    </table>
                </div> 
                <div className="user-profile"  >
                <h4>Total Accounts Data</h4>
                <hr/> 
                    <table class="table" style={{textAlign:'center'}}>
                        <tbody class="thead-light">
                            <tr>
                                <th scope="col">Registered</th>
                                <th scope="col">Plan Extended</th>
                                <th scope="col">Total</th>
                            </tr>
                        </tbody>
                        <tbody class="thead-light">
                            <tr>
                                <th scope="col">{register}</th>
                                <th scope="col">{extension}</th>
                                <th scope="col">{total}</th>
                            </tr>
                        </tbody>
                    </table>
                
            </div>
          </div>
            : null}
            {/*last 7 dats*/}
            <div style={{paddingLeft:5,paddingRight:5}} >
            {active.indexOf(1) === 1? 
                <div className='user-profile'  >
                    <h4>Last 7 days accounts Data</h4>
                    <hr/> 
                        <table class="table" style={{textAlign:'center'}}>
                            <thead class="thead-light">
                                <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Register</th>
                                <th scope="col">Plan Add</th>
                                <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody >
                               {
                                   last7Days && last7Days.map( vp => 
                                     <tr>
                                        <td >{`${vp.day}-${vp.month+1}-${vp.year}`}</td>
                                        <td >{vp.register}</td>
                                        <td >{vp.extension}</td>
                                        <td >{vp.register+vp.extension}</td>
                                    </tr>)
                               }
                            </tbody>
                        </table>
                </div>
                : null}
                {/* Complete data o two buttons  */}
                {active.indexOf(1) === 2? 
                <div className='user-profile'  style={{paddingLeft:5,paddingRight:5}}>
                <h4>Detailed accounts data</h4>
                <hr/> 
                    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        <button className='btn btn-primary' onClick={()=>showToday()} style={{fontWeight:500}}>Today Accounts</button>
                        <button className='btn btn-success' onClick={()=> showTotal()} style={{fontWeight:500}}>Total Accounts</button>
                    </div>
                </div>
                : null}

            {/*displaying full details */}

            {/* detailed data  of today accounts*/}
            {todayButton === true ? 
                <React.Fragment>
                <h2>Today Complete List</h2>
                {
                    todayList && todayList.map(d => <NotifyCard data = {d} />)
                }
                </React.Fragment>
                : null}
                {/* detailed data of  total accounts */}
                {totalButton === true ? 
                    <React.Fragment>
                    <h2>Total Complete List</h2>
                    {
                        totalList && totalList.map(d => <NotifyCard data = {d} />)
                    }
                    </React.Fragment>
                    : null}
                    </div>
                    
      
        </React.Fragment>
    );
}


export default AccountTemplate;