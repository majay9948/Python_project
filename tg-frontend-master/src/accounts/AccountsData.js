import React,{useState,useEffect} from 'react' 
import AccountTemplate from './AccountTemplate'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBarFour from '../components/navbar/NavBarFour'
import GenericFooter from '../components/footer/GenericFooter'


const AccountsData = (props)=>{
    let [dataList,setDataList] = useState(null)
    let [totalCnt,setTotalCnt] = useState(0)
    let [registerCnt,setRegisterCnt] = useState(0)
    let [addPlanCnt,setAddPlanCnt] = useState(0)
    let navigate = useNavigate()
    
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return 
        }
        if(props.login === false)
        {
            navigate('/')
            return 
        }
        if(props.userRole !== 'superuser')
        {
            navigate('/')
            return
        }
        //call api here  
        let superuser_id = localStorage.getItem('tg_id')
        axios.get(`${props.backend}/api/auth/superuser/${superuser_id}`)
        .then(response =>{
            if(response.status === 200)
            {
                let data = response.data.data 
                setTotalCnt(response.data.totalCount)
                setRegisterCnt(response.data.registerCount)
                setAddPlanCnt(response.data.addPlanCount)
                setDataList(data)
            }
        })
    },[])
    return (
        <React.Fragment>
            <NavBarFour  navigate={navigate}  />
            <div className='mini-container' style={{padding:0}}>
                {dataList && dataList.length > 0 ? 
                    <AccountTemplate data= {dataList} totalCnt={totalCnt} registerCnt={registerCnt} addPlanCnt={addPlanCnt} registeredNumber={props.phoneNumber} />
                : null}
            </div>
            <GenericFooter /> 
        </React.Fragment>
    );
}

export default AccountsData;