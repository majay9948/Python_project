import React,{useState,useEffect} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import { toast } from 'react-toastify';
import './filter.css';
import NormalChip from './NormalChip';

const PartisionStrategy = (props)=>{
    let [presentPartision,setPresentPartision] = useState(null)
    let [presentList,setPresentList] = useState([])
    let [partisionList,setPartisionList] = useState(null)
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


    useEffect(()=>{
        setPresentPartision(0)
        setPartisionList(ps[props.sportIndex])
        console.log(props.sportIndex)
        console.log(ps[props.sportIndex])
    },[])

    useEffect(()=>{
        if(props.responseStuff[3] === 1)
        {
            console.log(presentList)
            if(presentList.length === 0)
            {
                toast.warning('No Strategy is added!',{position:'top-center'})
                return 
            }
            let temp = []
            for(let i=0;i<presentList.length;i++)
            {
                temp.push(partisionList[presentList[i]])
            }
            let stuff = {
                filterType: 3, 
                presentList: temp,
                indexList: presentList     
            }
            props.setFourthFilter(stuff)
            let dp = [...props.filterIndexArray]
            dp[3] = 3
            props.setFilterIndexArray(dp)
            toast.success('Partision Strategy Filter Added!',{position:'top-center'})
            return
        }
    },[props.responseStuff])

    useEffect(()=>{
        if(props.selectInput === 3)
        {
            if(props.fourthFilter !== null)
            {

                setPresentList([...props.fourthFilter.indexList])
            }
        }
    },[props.selectInput])

    let handleFirstSelect = (e)=>{
        setPresentPartision(parseInt(e.target.value))
    }

    let handleFirstAdd = ()=>{
        if(presentList.includes(presentPartision))
        {
            toast.warning('Partision Strategy already present!',{position:'top-center'});
            return 
        }
        let newList = [...presentList]
        newList.push(presentPartision)
        setPresentList(newList)
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
                <div className='text-center' style={{fontWeight:500}}>Partision Strategy</div>   
                <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <div style={{fontWeight:500,color:'green',marginTop:5}}>Partision Present</div>
                <div className='d-flex justify-content-around align-items-center' style={{marginTop:5,marginBottom:5}}>
                    <select onChange={handleFirstSelect} class="form-select" style={{width:'70%'}}>
                        {partisionList && partisionList.map((p,i) => <option value={i}>
                                                                    {`${props.leftName}-${p[0]} : ${props.rightName}-${p[1]}`}
                                                         </option>
                            )}
                    </select>
                    <button onClick={ ()=> handleFirstAdd() } className='btn btn-sm btn-success' style={{fontWeight:500}}><MdAddCircle size={20} /> Add</button>
                </div>
                <div style={{backgroundColor:'rgb(234, 238, 243)',marginTop:10,marginBottom:10,borderRadius:8,padding:5}}>
                {presentList.length === 0 ? 
                    <div className='text-center' style={{fontWeight:500,color:'grey'}}>
                       No Partision is selected
                    </div>
                   :
                    <div className="chip-container">
                       {
                           presentList.map(p_index => <NormalChip handleClose={handleClose} value={p_index} >{`${props.leftName}-${partisionList[p_index][0]} : ${props.rightName}-${partisionList[p_index][1]}`}</NormalChip>)
                       }
                    </div>
                   }  
                
                  </div>
            </div>
                <div class="alert alert-warning mt-2" role="alert">
                    <h4 class="alert-heading">How It Works?</h4>
                    <p><b>Partision Present</b> will filter teams which contain Added Team Partision Strategies</p>
                </div>
           </div>
        </React.Fragment>
    );
}

export default PartisionStrategy;


