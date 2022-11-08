import React,{useState,useEffect} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import { toast } from 'react-toastify';
import './filter.css';
import NormalChip from './NormalChip';

const CombinationStrategy = (props)=>{
    let [presentCombination,setPresentCombination] = useState(null)
    let [presentList,setPresentList] = useState([])
    let [combinationList,setCombinationList] = useState(null)
    let [combinationName,setCombinationName] = useState([])
    let cn = [ 
        ['WK','BAT','AL','BOWL'],
        ['GK','DEF','MID','ST'],
        ['PG','SG','SF','PF','C'],
        ['DEF','ALL','RAI']
    ]
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


    useEffect(()=>{
        setPresentCombination(0)
        setCombinationList(cs[props.sportIndex])
        setCombinationName(cn[props.sportIndex])
    },[])

    useEffect(()=>{
        if(props.responseStuff[5] === 1)
        {
            if(presentList.length === 0)
            {
                toast.warning('No Combination is added!',{position:'top-center'})
                return 
            }
            let temp = []
            for(let i=0;i<presentList.length;i++)
            {
                temp.push(combinationList[presentList[i]])
            }
            let stuff = {
                filterType: 5, 
                presentList: temp,
                indexList: presentList 
            }
            props.setSixthFilter(stuff)
            let dp = [...props.filterIndexArray]
            dp[5] = 5
            props.setFilterIndexArray(dp)
            toast.success('Combination Strategy Filter Added!',{position:'top-center'})
            return
        }
    },[props.responseStuff])

    useEffect(()=>{
        if(props.selectInput === 5)
        {
            if(props.sixthFilter !== null)
            {
                setPresentList([...props.sixthFilter.indexList])
            }
        }

      },[props.selectInput])

    let handleFirstSelect = (e)=>{
        setPresentCombination(parseInt(e.target.value))
    }

    let handleFirstAdd = ()=>{
        if(presentList.includes(presentCombination))
        {
            toast.warning('Combination Strategy already present!',{position:'top-center'});
            return 
        }
        let newList = [...presentList]
        newList.push(presentCombination)
        setPresentList(newList)
    }

    let printArray = (array)=>{
        if(array.length === 0) return ''
        let result = ''
        for(let i=0;i<array.length-1;i++)
            result = result + array[i]+ '-'
        result = result + array[array.length-1]
        return result 
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
                <div className='text-center' style={{fontWeight:500}}>Combination Strategy</div>   
                <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <div style={{fontWeight:500,color:'green',marginTop:5}}>Combination Present ({combinationName!== null? printArray(combinationName) : ''})</div>
                <div className='d-flex justify-content-around align-items-center' style={{marginTop:5,marginBottom:5}}>
                    <select onChange={handleFirstSelect} class="form-select" style={{width:'70%'}}>
                        {combinationList && combinationList.map((p,i) => <option value={i}>
                                                                    {printArray(p)}
                                                         </option>
                            )}
                    </select>
                    <button onClick={ ()=> handleFirstAdd() } className='btn btn-sm btn-success' style={{fontWeight:500}}><MdAddCircle size={20} /> Add</button>
                </div>
                <div style={{backgroundColor:'rgb(234, 238, 243)',marginTop:10,marginBottom:10,borderRadius:8,padding:5}}>
                {presentList.length === 0 ? 
                    <div className='text-center' style={{fontWeight:500,color:'grey'}}>
                       No Combination is selected
                    </div>
                   :
                    <div className="chip-container">
                       {
                           presentList.map(p_index => <NormalChip handleClose={handleClose} value={p_index} >{printArray(combinationList[p_index])}</NormalChip>)
                       }
                    </div>
                   }  
                
                  </div>
            </div>
                <div class="alert alert-warning mt-2" role="alert">
                    <h4 class="alert-heading">How It Works?</h4>
                    <p><b>Combination Present</b> will filter teams which contain Added Team Combination Strategies</p>
                </div>
           </div>
        </React.Fragment>
    );
}

export default CombinationStrategy;


