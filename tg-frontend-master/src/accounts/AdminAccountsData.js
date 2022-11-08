import React,{useState,useEffect} from 'react'
import NavBarFour from '../components/navbar/NavBarFour';
import GenericFooter from '../components/footer/GenericFooter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AccountTemplate from './AccountTemplate'
import { toast } from 'react-toastify';




const AdminAccountsData = (props)=>{
    let navigate = useNavigate()
    const [phoneNumber,setPhoneNumber] = useState('')
    const [dataList,setDataList] = useState(null)
    let [totalCnt,setTotalCnt] = useState(0)
    let [registerCnt,setRegisterCnt] = useState(0)
    let [addPlanCnt,setAddPlanCnt] = useState(0)
    const [visible,setVisible] = useState(false)
    let handlePhone = (e)=>{
        setPhoneNumber(e.target.value)
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        if(phoneNumber.length !== 10)
        {
            toast.error('Invalid Mobile Number!',{position:'top-center'})
            return;
        }
        let admin_id = localStorage.getItem('tg_id')
        axios.get(`${props.backend}/api/auth/admin/superuserdetail/${admin_id}/${phoneNumber}`)
        .then(response =>{
            if(response.status === 200)
            {
                let data = response.data.data 
                setTotalCnt(response.data.totalCount)
                setRegisterCnt(response.data.registerCount)
                setAddPlanCnt(response.data.addPlanCount)
                setDataList(data)
            }
            else 
            {
                toast.error('Some Error occured to fetch!',{position:'top-center'})
                return 
            }
        })
        setVisible(true)
    }
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
        if(props.userRole !== 'admin')
        {
            navigate('/')
            return
        }
    },[])
    return (
        <React.Fragment>
            <NavBarFour navigate={navigate} />
                <div className='mini-container' style={{padding:0}}>
                        <div className='user-profile'>
                            <h4>Get Super User</h4>
                            <hr/> 
                            <form onSubmit={handleSubmit} className='d-flex justify-content-center align-items-center'>
                                <input onChange={handlePhone} type="text" placeholder='phone number' value={phoneNumber}  />
                                <input type="submit" className='btn btn-primary btn-sm' value="Get User"/>
                            </form>
                        </div>
                    {/* content here */}
                    {visible === true ?
                       <React.Fragment>
                        {dataList && dataList.length>0 ?
                                <AccountTemplate data={dataList} totalCnt={totalCnt} registerCnt={registerCnt} addPlanCnt={addPlanCnt} registeredNumber={phoneNumber} />
                            : null}
                       
                       </React.Fragment>
                        : null}
                </div> 
            <GenericFooter />
        </React.Fragment>
    );
}

export default AdminAccountsData;