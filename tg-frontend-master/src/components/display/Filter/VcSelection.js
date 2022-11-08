import React,{useState,useEffect} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import { toast } from 'react-toastify';
import './filter.css';
import NormalChip from './NormalChip';

const VcSelection = (props)=>{
    let [presentPlayer,setPresentPlayer] = useState(null)
    let [presentList,setPresentList] = useState([])
    let [playerIndexList,setPlayerIndexList] = useState([])

    useEffect(()=>{
        setPresentPlayer(parseInt(props.filterPlayerList[0].player_index))
        let temp_list = []
        for(let i=0;i<70;i++)
            temp_list.push({})
        for(let i=0;i<props.filterPlayerList.length;i++)
            temp_list[props.filterPlayerList[i].player_index] = {...props.filterPlayerList[i]} 
        setPlayerIndexList(temp_list)
    },[])

    useEffect(()=>{
        if(props.responseStuff[2] === 1)
        {
            if(presentList.length === 0)
            {
                toast.warning('No player is added!',{position:'top-center'})
                return 
            }
            let stuff = {
                filterType: 2, 
                presentList: presentList
            }
            props.setThirdFilter(stuff)
            let dp = [...props.filterIndexArray]
            dp[2] = 2
            props.setFilterIndexArray(dp)
            toast.success('VC Selection Filter Added!',{position:'top-center'})
            return
        }
    },[props.responseStuff])

    useEffect(()=>{
        if(props.selectInput === 2)
        {
            if(props.thirdFilter !== null)
            {
                setPresentList([...props.thirdFilter.presentList])
            }
        }
    },[props.selectInput])

    let handleFirstSelect = (e)=>{
        setPresentPlayer(parseInt(e.target.value))
    }

    let handleFirstAdd = ()=>{
        if(presentList.includes(presentPlayer))
        {
            toast.warning('Player already present!',{position:'top-center'});
            return 
        }
        let newList = [...presentList]
        newList.push(presentPlayer)
        setPresentList(newList)
    }

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

    let handleClose = (removeValue)=>{
        let index = presentList.indexOf(removeValue)
        if(index !== -1)
        {
             let temp = [...presentList]
             temp.splice(index,1)
             setPresentList(temp)
        }
     }   

    return (
        <React.Fragment>
           <div style={{padding:5,marginTop:10,boxShadow:'0px 0px 5px grey',borderRadius:5}}> 
                <div className='text-center' style={{fontWeight:500}}>VC Selection</div>   
                <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <div style={{fontWeight:500,color:'green',marginTop:5}}>Player Present</div>
                <div className='d-flex justify-content-around align-items-center' style={{marginTop:5,marginBottom:5}}>
                    <select onChange={handleFirstSelect} class="form-select" style={{width:'70%'}}>
                        {props.filterPlayerList.map(p => <option value={p.player_index}>
                                                                    {p.name} ({p.team_name})
                                                         </option>
                            )}
                    </select>
                    <button onClick={ ()=> handleFirstAdd() } className='btn btn-sm btn-success' style={{fontWeight:500}}><MdAddCircle size={20} /> Add</button>
                </div>
                <div style={{backgroundColor:'rgb(234, 238, 243)',marginTop:10,marginBottom:10,borderRadius:8,padding:5}}>
                {presentList.length === 0 ? 
                    <div className='text-center' style={{fontWeight:500,color:'grey'}}>
                       No player is selected
                    </div>
                   :
                    <div className="chip-container">
                       {
                           presentList.map(p_index => <NormalChip handleClose={handleClose} value={p_index} >{get_name(playerIndexList[p_index].name)}</NormalChip>)
                       }
                    </div>
                   }  
                
                  </div>
            </div>
                <div class="alert alert-warning mt-2" role="alert">
                    <h4 class="alert-heading">How It Works?</h4>
                    <p><b>Player Present</b> will filter teams which contain added players as <b>Vice Captain</b></p>
                </div>
           </div>
        </React.Fragment>
    );
}

export default VcSelection;


