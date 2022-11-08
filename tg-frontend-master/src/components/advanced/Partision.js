import React,{useState,useEffect} from 'react'  
import { useNavigate } from 'react-router-dom' 
import NavBarTwo from '../navbar/NavBarTwo'
import ContinueFooter from '../footer/ContinueFooter'
import PartisionCard from './PartisionCard'
import { toast } from 'react-toastify';



const Partision = (props)=>{
    let navigate = useNavigate()
    let strategies = [
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
    let [localPartision,setLocalPartision] = useState([])
    let get_player = (pi)=>
    {
        for(let i=0;i<props.selectedPlayers.length;i++)
       {
           for(let j=0;j<props.selectedPlayers[i].length;j++)
           {
               if(pi===props.selectedPlayers[i][j].player_index)
               return props.selectedPlayers[i][j]
           }
       }
       return null 
    }
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        let left_cnt =0;
        let right_cnt = 0;
       for(let i=0;i<props.fixedPlayers.length;i++)
       {
           for(let j=0;j<props.fixedPlayers[i].length;j++)
           {
               let pi = props.fixedPlayers[i][j]
               let p = get_player(pi)
               if(p!=null)
               {
                   if(p.team_index===0)
                    left_cnt++;
                   else 
                    right_cnt++;
               }
           }
       }
       let selected_partision = []
       for(let i=0;i<strategies[props.sportIndex].length;i++)
       {
           if(strategies[props.sportIndex][i][0]>=left_cnt && strategies[props.sportIndex][i][1]>=right_cnt)
                selected_partision.push({id:i,selected:0,data:strategies[props.sportIndex][i]})
       }
      // console.log(selected_partision)
       setLocalPartision([...selected_partision])
    //   console.log(localPartision)
    },[])
    let handlePartision = (id)=>{
        let newStrategy = localPartision.map(strategy => {
            if(id === strategy.id)
                strategy.selected = strategy.selected === 0? 1 : 0;
            return strategy
        })
        setLocalPartision(newStrategy)
    }
    let handleContinue = () =>{
        let newPartisionStrategy = localPartision.filter( partision => partision.selected===1 )
        if(newPartisionStrategy.length<1)
        {
            toast.error('Should select 1 or More Strategies',{
                position:"top-center"
            })
            return 
        }
        let finalPartisionStrategy = newPartisionStrategy.map(p=> p.data)
        props.setPartisionStrategy(finalPartisionStrategy)
       // console.log(finalPartisionStrategy)
        navigate('/selection')
    }

    return (
        <React.Fragment>
        <NavBarTwo navigate={navigate} /> 
        <div className='continue-container'>
        <div className="section-info" style={{lineHeight:"1.2"}}>
            <span className='section-primary'>Team Partision Section</span><br></br>
            <span className='section-secondary'>Teams will be created with selected no.f players from each team</span> <br></br>
            <span className='section-secondary'>you can selected <span style={{color:'black',fontWeight:500}}>1 or More Strategies</span></span>
        </div>
        <div className='mt-2'>
            { localPartision.map((strategy)=> <PartisionCard 
                    leftName = {props.leftName}
                    rightName = {props.rightName}
                    leftImage = {props.leftImage}
                    rightImage = {props.rightImage}
                    strategy = {strategy}
                    handlePartision = {handlePartision}
                /> )}
        </div>
        </div>
        <ContinueFooter handleContinue ={handleContinue}  />
        </React.Fragment>
    );
}

export default Partision;     

