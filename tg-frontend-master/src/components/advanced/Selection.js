import React,{useState,useEffect} from 'react'  
import { useNavigate } from 'react-router-dom' 
import NavBarTwo from '../navbar/NavBarTwo'
import ContinueFooter from '../footer/ContinueFooter'
import SelectionCard from './SelectionCard'
import { toast } from 'react-toastify';



const Selection = (props)=>{
    let navigate = useNavigate()
     
    // 0 => 0 - 30 => players form 0 -30 % range 
    // 1 => 30 - 70 => players form 30 -70 % range 
    // 2 => 70 - 100 => players form 70 -100 % range
    
    let selection_strategies = [
      [
        //cricket
        [2,5,4],
        [3,4,4],
        [4,3,4],
        [2,4,5],
        [1,6,4],
        [3,3,5],
        [3,2,6],
        [6,2,3],
        [3,6,2],
        [3,5,3],
        
        
      ],
      [
        //football
        [2,5,4],
        [3,4,4],
        [4,3,4],
        [2,4,5],
        [1,6,4],
        [3,3,5],
        [3,2,6],
        [6,2,3],
        [3,6,2],
        [3,5,3]
      ],
      [
        //basketball
        [2,3,3],
        [3,3,2],
        [3,2,3],
        [1,4,3],
        [1,3,4],
        [4,1,3],
        [3,1,4],
        [3,4,1],
        [4,3,1]

      ],
      [
        //kabaddi 
        [2,3,2],
        [3,2,2],
        [2,2,3],
        [1,4,2],
        [1,2,4],
        [2,1,4],
        [4,1,2],
        [2,4,1],
        [4,2,1]
      ]
    ]
    let limit = [
        [0,29],
        [30,69],
        [70,100]
    ]
    let [localSelection,setLocalSelection] = useState([])
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        let s_cnt = [0,0,0]
        for(let i=0;i<props.selectedPlayers.length;i++)
        {
            for(let j=0;j<props.selectedPlayers[i].length;j++)
            {
                let p = props.selectedPlayers[i][j]; 
                let temp = parseFloat(p.selected_by)
                for(let k=0;k<limit.length;k++)
                {
                    if(temp>= parseFloat(limit[k][0]) && temp <= parseFloat(limit[k][1]))
                    {
                        s_cnt[k] = s_cnt[k] + 1 
                    }
                }
            }
        }
        // console.log(s_cnt)
        // console.log(selection_strategies[props.sportIndex])
       let selected_selection = []
       for(let i=0;i<selection_strategies[props.sportIndex].length;i++)
       {
           if(selection_strategies[props.sportIndex][i][0]<=s_cnt[0] && selection_strategies[props.sportIndex][i][1]<=s_cnt[1] && selection_strategies[props.sportIndex][i][2]<=s_cnt[2])
           {
            selected_selection.push({id:i,selected:0,data:selection_strategies[props.sportIndex][i]})
           }
       }
       setLocalSelection([...selected_selection])
    },[])
    let handleSelection = (id)=>{
        let newStrategy = localSelection.map(strategy => {
            if(id === strategy.id)
                strategy.selected = strategy.selected === 0? 1 : 0;
            return strategy
        })
        setLocalSelection(newStrategy)
    }
    let handleContinue = () =>{
        let newSelectionStrategy = localSelection.filter( selection => selection.selected===1 )
        if(newSelectionStrategy.length<1)
        {
            toast.error('Should select 1 or More Strategies',{
                position:"top-center"
            })
            return 
        }
        let finalSelectionStrategy = newSelectionStrategy.map(p=> p.data)
        props.setSelectionStrategy(finalSelectionStrategy)
        props.setSelectionFlag(true)
        navigate('/credit')
    }

    return (
        <React.Fragment>
        <NavBarTwo navigate={navigate} /> 
        <div className='continue-container'>
        <div className="section-info" style={{lineHeight:"1.2"}}>
            <span className='section-primary'>Player % Selection Strategy</span> <br></br>
            <span className='section-secondary'>This is a new Observation found in fantasy  </span> <br></br>
            <span className='section-secondary'> if have idea select <span style={{color:'black',fontWeight:500}}>1 or More</span></span> <br></br>
            <span className='section-secondary'>If don't know aobut this you can <span style={{color:'black',fontWeight:500}}>Click on Skip</span></span>
        </div>
        
            {localSelection.length < 3 ?
                <React.Fragment>
                <div className="section-info" style={{marginTop:50,marginLeft:5,marginRight:5,borderRadius:5}}>
                <span className='section-primary'>Click on Skip</span>
                <span className='section-secondary'>Your player selection will not support player % selection  </span>
                <span className='section-secondary'>software will take care of it, so click on <span style={{color:'black',fontWeight:500}}>Skip</span></span>
            </div>
               
                </React.Fragment>
                 :
                <React.Fragment>
                <div className='mt-2 '>
                    {
                        localSelection.map((strategy)=> <SelectionCard 
                        limit = {limit}
                        strategy = {strategy}
                        handleSelection = {handleSelection}
                        /> )
                    }
                </div>
                
                </React.Fragment>
            }
        </div>
        <React.Fragment>
        {
            localSelection.length < 3 ?
            <div className="footer container d-flex justify-content-center p-2" style={{maxWidth:600,padding:0}}>
                <button onClick={()=> {  navigate('/credit') }} className="btn btn-dark btn-sm vp-btn" style={{marginRight:5}}>Skip This Section</button>
            </div>
            :
            <div className="footer container d-flex justify-content-center p-2" style={{maxWidth:600,padding:0}}>
                <button onClick={()=> {  navigate('/credit') }} className="btn btn-dark btn-sm vp-btn" style={{marginRight:5}}>Skip This Section</button>
                <button onClick={()=> handleContinue() } className="btn btn-success btn-sm vp-btn"> Continue </button>
            </div>
        }
        </React.Fragment>
        </React.Fragment>
    );
}

export default Selection;     

