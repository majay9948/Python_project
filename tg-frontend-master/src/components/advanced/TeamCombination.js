import React,{useEffect,useState,useRef} from 'react' 
import {useNavigate} from 'react-router-dom'
import ContinueFooter from '../footer/ContinueFooter';
import NavBarTwo from '../navbar/NavBarTwo';
import CombinationCard from './CombinationCard'
import { toast } from 'react-toastify';


const TeamCombination = (props)=>{
    let navigate = useNavigate()
    let combinations = [
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
    let combinationName = [ 
        ['WK','BAT','AL','BOWL'],
        ['GK','DEF','MID','ST'],
        ['PG','SG','SF','PF','C'],
        ['DEF','ALL','RAI']
    ]
    let [localCombination,setLocalCombination] = useState([])
    let fixedCnt = useRef([])
    let selectedCnt = useRef([])
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        let tempFixed = []
        let tempSelected = []
        console.log(props.fixedPlayers)
        
        for(let i=0;i<props.fixedPlayers.length;i++)
            tempFixed.push(props.fixedPlayers[i].length)
        for(let i=0;i<props.selectedPlayers.length;i++)
            tempSelected.push(props.selectedPlayers[i].length)
        fixedCnt.current = tempFixed
        selectedCnt.current = tempSelected
        console.log(tempFixed)
        console.log(tempSelected)
        let f_combinations = []
        for(let i=0;i<combinations[props.sportIndex].length;i++)
        {
            let comb = combinations[props.sportIndex][i]
            let c_length = comb.length
            let flag = 0 
            for(let j=0;j<comb.length;j++)
            {
                if(comb[j]>=fixedCnt.current[j] && comb[j]<=selectedCnt.current[j])
                    flag++  
            }
            if(flag===c_length)
             f_combinations.push({id:i,selected:0,data:comb})
        }
        console.log(f_combinations)
        setLocalCombination(f_combinations)
    },[])

    let handleCombination = (id)=>{
        let newCombination = localCombination.map(combination => {
            if(id === combination.id)
            combination.selected = combination.selected === 0? 1 : 0;
            return combination
        })
        setLocalCombination(newCombination)
    }
    let handleContinue = ()=>{
        let newCombiantion = localCombination.filter( combination => combination.selected===1 )
        if(newCombiantion.length<1)
        {
            toast.error('Should Select 1 or More Combinations',{
                position:"top-center"
            });
            return 
        }
        let finalCombination = newCombiantion.map(c=> c.data)
        props.setCombination(finalCombination)
        navigate('/advanced')
        
    }
    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} /> 
            <div className='continue-container'>
                <div className="section-info" style={{lineHeight:"1.2"}}>
                    <span className='section-primary'>Team Combinations</span> <br></br>
                    <span className='section-secondary'>Select Proper Combinations for Winning Teams</span> <br></br>
                    <span className='section-secondary'>Follow intrudctions by Believer01 and select <span style={{color:'black',fontWeight:500}}>1 or More Combinations</span></span>
                </div>
                <div className='mt-2'>
                { localCombination.map((combination)=> <CombinationCard 
                        combinationName = {combinationName[props.sportIndex]}
                        combination = {combination}
                        handleCombination = {handleCombination}
                    /> )}
            </div>
            </div> 
            <ContinueFooter handleContinue ={handleContinue}  />
        </React.Fragment>
    );
}
export default TeamCombination; 