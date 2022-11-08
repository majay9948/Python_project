import React,{useEffect,useState} from 'react' 
import {MdClose , MdAddCircle} from 'react-icons/md'
import PlayerSelection from './PlayerSelection';
import CaptainSelection from './CaptainSelection';
import VcSelection from './VcSelection';
import PartisionStrategy from './PartisionStrategy';
import TeamCredits from './TeamCredits';
import CombinationStrategy from './CombinationStrategy';
import FilterChip from './FilterChip';


const FilterTemplate = (props)=>{

    let [selectInput,setSelectInput] = useState(null);
    let [spinner,setSpinner] = useState(false)
    
    //response stuff 
    let [responseStuff,setResponseStuff] = useState([0,0,0,0,0,0])
    let filterLabel = ['Player Selectioin' , 'Captain Selection','VC Selection','Partision Strategy','Team Credits','Combination Strategy']
    useEffect(()=>{
        setSelectInput(0)
    },[])
   
    let handleSelectInput = (e)=>{
        setSelectInput(parseInt(e.target.value))
        setResponseStuff([0,0,0,0,0,0])
    }
    let getFilterComponent = ()=>{
        let resultTemplate = <React.Fragment></React.Fragment>
        switch (selectInput) {
            case 0:
                resultTemplate = <React.Fragment>
                                    <PlayerSelection 
                                        filterPlayerList = {props.filterPlayerList}
                                        firstFilter = {props.firstFilter}
                                        setFirstFilter = {props.setFirstFilter}
                                        filterIndexArray = {props.filterIndexArray}
                                        setFilterIndexArray = {props.setFilterIndexArray}
                                        responseStuff = {responseStuff}
                                        selectInput = {selectInput}
                                        
                                    />
                                 </React.Fragment>
                break;
            case 1: 
                resultTemplate = <React.Fragment>
                                    <CaptainSelection
                                        filterPlayerList = {props.filterPlayerList}
                                        secondFilter = {props.secondFilter}
                                        setSecondFilter = {props.setSecondFilter}
                                        filterIndexArray = {props.filterIndexArray}
                                        setFilterIndexArray = {props.setFilterIndexArray}
                                        responseStuff = {responseStuff}
                                        selectInput = {selectInput} 
                                    />
                                 </React.Fragment>
                break;
            case 2: 
                resultTemplate = <React.Fragment>
                                    <VcSelection 
                                        filterPlayerList = {props.filterPlayerList}
                                        thirdFilter = {props.thirdFilter}
                                        setThirdFilter = {props.setThirdFilter}
                                        filterIndexArray = {props.filterIndexArray}
                                        setFilterIndexArray = {props.setFilterIndexArray}
                                        responseStuff = {responseStuff}
                                        selectInput = {selectInput} 
                                    />
                                 </React.Fragment>
                break;
            case 3: 
                resultTemplate = <React.Fragment>
                                    <PartisionStrategy 
                                        fourthFilter = {props.fourthFilter}
                                        setFourthFilter = {props.setFourthFilter}
                                        filterIndexArray = {props.filterIndexArray}
                                        setFilterIndexArray = {props.setFilterIndexArray}
                                        responseStuff = {responseStuff}
                                        sportIndex = {props.sportIndex}
                                        leftName = {props.leftName}
                                        rightName = {props.rightName}
                                        selectInput = {selectInput} 
                                    />
                                 </React.Fragment>
                break;  
            case 4: 
                resultTemplate = <React.Fragment>
                                    <TeamCredits 
                                        fifthFilter = {props.fifthFilter}
                                        setFifthFilter = {props.setFifthFilter}
                                        filterIndexArray = {props.filterIndexArray}
                                        setFilterIndexArray = {props.setFilterIndexArray}
                                        responseStuff = {responseStuff}
                                        selectInput = {selectInput}
                                    />
                                 </React.Fragment>
                break;
            case 5: 
                resultTemplate = <React.Fragment>
                                    <CombinationStrategy 
                                        sixthFilter = {props.sixthFilter}
                                        setSixthFilter = {props.setSixthFilter}
                                        filterIndexArray = {props.filterIndexArray}
                                        setFilterIndexArray = {props.setFilterIndexArray}
                                        responseStuff = {responseStuff}
                                        sportIndex = {props.sportIndex}
                                        selectInput = {selectInput}
                                    />
                               </React.Fragment>
                break;
            default: 
                resultTemplate = <React.Fragment>
                                    <PlayerSelection
                                        filterPlayerList = {props.filterPlayerList}
                                        firstFilter = {props.firstFilter}
                                        setFirstFilter = {props.setFirstFilter}
                                        filterIndexArray = {props.filterIndexArray}
                                        setFilterIndexArray = {props.setFilterIndexArray}
                                        responseStuff = {responseStuff}
                                    />
                                </React.Fragment>
        }
        return resultTemplate;
    }

    let arrayValueCount = ()=>{
        let cnt = 0  
        if(props.firstFilter !== null) cnt++ 
        if(props.secondFilter !== null) cnt++
        if(props.thirdFilter !== null) cnt++
        if(props.fourthFilter !== null) cnt++
        if(props.fifthFilter !== null) cnt++
        if(props.sixthFilter !== null) cnt++
        return cnt;
    }

   


    let handleClick = ()=>{
        let temp = [0,0,0,0,0,0]
        temp[selectInput] = 1 
        setResponseStuff(temp)
        handleSpinner()
    }

    let handleClose = (index)=>{
        let temp = [...props.filterIndexArray]
        temp[index] = -1 
        props.setFilterIndexArray(temp)
        if(index === 0) props.setFirstFilter(null)
        else if(index === 1) props.setSecondFilter(null) 
        else if(index === 2) props.setThirdFilter(null) 
        else if(index === 3) props.setFourthFilter(null)  
        else if(index === 4) props.setFifthFilter(null) 
        else props.setSixthFilter(null)
        handleSpinner()
        
    }

    let handleSpinner = ()=>{
        setSpinner(true)
        setTimeout(()=>{
            setSpinner(false)
        },2000)
    }

    let handleEdit = (index)=>{
        setSelectInput(index)
        setResponseStuff([0,0,0,0,0,0])
    }

    return (
        <React.Fragment>
        <div class="card animate-card">
            <div class="card-header d-flex justify-content-between align-items-center" style={{backgroundColor:'white',fontWeight:500,fontSize:18}}>
               Advanced Filter
               <MdClose color='red' onClick={()=>{ props.setFilter(0) }} size={20} />
            </div>
            <div class="card-body filter-content">
                <div className='d-flex justify-content-around align-items-center' style={{borderBottom:'0.5px solid grey',paddingBottom:15}}>
                    <span style={{fontWeight:500}}>Filter Type</span>
                    <select onChange={handleSelectInput} class="form-select" style={{width:'70%'}}>
                        <option value="0">Player Selection</option>
                        <option value="1">Captain Selection</option>
                        <option value="2">VC Selection</option>
                        <option value="3">Partision Strategy</option>
                        <option value="4">Team Credits</option>
                        <option value="5">Combination Strategy</option>
                    </select>
                </div>
                {/*filter chip list*/}

                <div style={{backgroundColor:'rgb(234, 238, 243)',marginTop:10,marginBottom:10,borderRadius:8,padding:5}}>
                    { 
                        arrayValueCount() === 0? 
                        <div className='text-center' style={{fontWeight:500,color:'grey'}}>No Filter Is Added</div>
                        :
                        <div className='chip-container'>
                            { props.filterIndexArray.map((v,index) => v!== -1? <FilterChip handleEdit={handleEdit} handleClose={handleClose} index={v} >{filterLabel[v]}</FilterChip> : null) }
                        </div>
                    }  
                </div>
                <div style={{borderBottom:'0.5px solid grey'}}></div>
                {getFilterComponent()} 
            </div>
            <div class="card-footer d-flex justify-content-around align-items-center">
                <button className='btn btn-sm' onClick={()=> handleClick()}  style={{backgroundColor:'purple',color:'white'}}><MdAddCircle size={20} />&nbsp;Add Filter</button>
                <div style={{fontWeight:800, fontSize:18}}>
               <div className='d-flex'>
                    {spinner === true ?
                        <div class="d-flex justify-content-center" style={{marginRight:10    }}>
                            <div class="spinner-border" role="status"></div>
                        </div>
                        : 
                        <span style={{color:'green'}}>{props.filterData.length}</span>
                    }
                <span> - Teams</span></div>
               </div>
               </div>
        </div>
        </React.Fragment>
    );
}

export default FilterTemplate;