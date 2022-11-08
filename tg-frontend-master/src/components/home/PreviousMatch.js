import React,{useEffect,useState} from 'react'  
import NavBarOne from '../navbar/NavBarOne'
import {useNavigate} from 'react-router-dom'
import NavBarThree from '../navbar/NavBarThree'
import Footer from '../footer/Footer'
import PreviousMatchCard from './PreviousMatchCard'


const PreviousMatch = (props)=>{
    let navigate = useNavigate()
    let [data,setData]= useState(null)
    useEffect(()=>{
       
        if(props.reload === null)
        {
            navigate('/')
            return
        }

        if(props.login === false)
        {
            navigate('/login')
            return 
        }
        if(props.plan === false)
        {
            navigate('/plandata')
        }

        let ata = JSON.parse(localStorage.getItem('tgk_data'))
        for(let i=0;i<ata.length;i++)
        {
            let temp = ata[i]
            temp.sort((x,y)=>{
                if(x.time<y.time)
                return 1 
                else 
                return -1
            })
            ata[i]= temp;
        }
        setData(ata)
    },[])
    return (
        <React.Fragment>
        <div className="content"> 
                <NavBarOne userRole={props.userRole} backend={props.backend} />
                <NavBarThree 
                sportIndex = {props.sportIndex}
                setSportIndex = {props.setSportIndex}
                />

                {/* Done with the upper part */}
                <div className="sub-content">
                <h4 className="sub-heading">My Matches</h4>
                <div className="d-flex flex-column">
                { data &&  data[props.sportIndex].map((match)=> <PreviousMatchCard key={match.id}  match = {match} /> ) }
                </div>  
                </div>
               
            </div>
            <Footer
            bottomIndex = {props.bottomIndex}
            setBottomIndex = {props.setBottomIndex}
            />
        </React.Fragment>
    );
}

export default PreviousMatch;