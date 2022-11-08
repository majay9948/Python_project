import React,{useState,useEffect} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import { toast } from 'react-toastify';
import './filter.css';
import NormalChip from './NormalChip';

const TeamCredits = (props)=>{
    let [credit,setCredit] = useState(null)
    let [presentList,setPresentList] = useState([])
   

    useEffect(()=>{
    },[])

    useEffect(()=>{
        if(props.responseStuff[4] === 1)
        {
            if(presentList.length === 0 )
            {
              //  console.log(credit)
                toast.warning('Credit List is Empty!',{position:'top-center'})
                return 
            }
            let stuff = {
                filterType: 4, 
                presentList: presentList
            }
            props.setFifthFilter(stuff)
            let dp = [...props.filterIndexArray]
            dp[4] = 4
            props.setFilterIndexArray(dp)
            toast.success('Team Credits Filter Added!',{position:'top-center'})
            return
        }
    },[props.responseStuff])

    useEffect(()=>{
        if(props.selectInput === 4)
        {
            if(props.fifthFilter !== null)
            {
                setPresentList([...props.fifthFilter.presentList])
            }
        }
    },[props.selectInput])

    let handleCredit = (e)=>{
        setCredit(parseFloat(e.target.value))
    }

    let handleAddCredit = ()=>{
        if(credit === null || isNaN(credit) === true )
        {
          //  console.log(credit)
            toast.warning('Invalid Credits!',{position:'top-center'})
            return 
        }
        if(presentList.includes(parseFloat(credit))){

            toast.warning('Credit already present!',{position:'top-center'});
            return 
        }
        let newList = [...presentList]
        newList.push(parseFloat(credit))
        setPresentList(newList)
    }


    let handleClose = (removeCredit)=>{
       let index = presentList.indexOf(removeCredit)
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
                <div className='text-center' style={{fontWeight:500}}>Team Credits</div>   
                <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <div style={{fontWeight:500,color:'green',marginTop:5}}>Credit Present</div>
                <div className='d-flex justify-content-around align-items-center' style={{marginTop:5,marginBottom:5}}>
                    <input type="number" onChange={handleCredit} name="credit" placeholder='Enter Credit' value={credit} />
                    <button onClick={ ()=> handleAddCredit() } className='btn btn-sm btn-success' style={{fontWeight:500}}><MdAddCircle size={20} /> Add</button>
                </div>
                <div style={{backgroundColor:'rgb(234, 238, 243)',marginTop:10,marginBottom:10,borderRadius:8,padding:5}}>
                {presentList.length === 0 ? 
                    <div className='text-center' style={{fontWeight:500,color:'grey'}}>
                       No Credit is Added
                    </div>
                   :
                    <div className="chip-container">
                       {
                           presentList.map(p_index => <NormalChip handleClose={handleClose} value={p_index} >{p_index}</NormalChip>)
                       }
                    </div>
                   }  
                
                  </div>
            </div>
                <div class="alert alert-warning mt-2" role="alert">
                    <h4 class="alert-heading">How It Works?</h4>
                    <p><b>Credit Present</b> will filter teams which contain Added Team Credits</p>
                </div>
           </div>
        </React.Fragment>
    );
}

export default TeamCredits;


