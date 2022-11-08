import React,{useEffect,useState,useRef} from 'react'  
import { useNavigate } from 'react-router-dom'
import NavBarTwo from '../components/navbar/NavBarTwo'
import GenericFooter from '../components/footer/GenericFooter'
import { toast } from 'react-toastify';
import axios from 'axios';


const ManageUser = (props)=>{
    let [phone,setPhone] = useState('')
    let [duration,setDuration] = useState(null)
    let [data,setData] = useState(null)
    let [flag,setFlag] = useState(false)
    let [addDiv,setAddDiv] = useState(false)
    let [addPrimeDiv,setAddPrimeDiv] = useState(false)
    let [primeDuration,setPrimeDuration] = useState(null)
    let navigate = useNavigate()
    useEffect(()=>{
        if(props.reload === null )
        {
            navigate('/')
            return
        }     
        if(props.userRole !== 'admin' && props.userRole !== 'superuser')
        {
            navigate('/')
            return 
        }
        console.log(props.primeAdmin)
    },[])
    let get_days = (end_date) =>{
        let arr = end_date.split('-')
        arr = arr.map(a => Number(a))
        let end = new Date()
        end.setFullYear(arr[2])
        end.setMonth(arr[1]-1)
        end.setDate(arr[0])
        console.log(end.toString())
        let final_date = end.getTime()
        let now = new Date().getTime()
        console.log(now.toString())
        let distance = final_date-now
        var diff_days = Math.floor(distance / (1000 * 3600 * 24));
return diff_days;
    }

    let handlePhone = (e)=>{
        setPhone(e.target.value)
    }
    let handleDuration = (e)=>{
        setDuration(e.target.value)
    }
    let handlePrimeDuration = (e)=>{
        setPrimeDuration(e.target.value)
    }
    let refreshData = ()=>{
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        axios.post(`${props.backend}/api/auth/details/${admin_id}`,{phoneNumber:data.phoneNumber})
        .then((r)=>{
            if(r.status===200)
            {
                setData(r.data.data)
            }
        })
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(props.userRole === 'superuser' && phone === '9848579715')
        {
            toast.error('you cannot see creator details!',{position: 'top-center'})
            return
        }
        axios.post(`${props.backend}/api/auth/details/${admin_id}`,{phoneNumber:phone})
        .then((response)=>{
            if(response.status===200)
            {
                setData(response.data.data)
                setFlag(true)
            }
            else if(response.status===201)
            {
                toast.error(response.data.message,{position:'top-center'})
                return 
            }
            else 
            {
                toast.error('something went wrong!',{position:'top-center'})
                return 
            }

        })
        //some stuff here 
    }
    let handleDurationSubmit = (e)=>{
        e.preventDefault()
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        if(duration === null || duration === '')
        {
            toast.error('Enter Correct Duration')
            return
        }
        console.log(admin_id)
        console.log(data.userId)
        let admin_url = `${props.backend}/api/plan/add/${data.userId}/${admin_id}`
        let superuser_url = `${props.backend}/api/plan/add/super/${data.userId}/${admin_id}`
        let req_url = false ? admin_url : superuser_url //props.userRole === 'admin'
        axios.post(req_url,{duration:Number(duration)})
        .then((res)=>{
            if(res.status===200)
            {   
               toast.success('Plan Added Successfully!',{position:'top-center'})
               setAddDiv('false')
               refreshData()
               return 
            }
            else 
            {
                toast.error('something went wrong!',{position:'top-center'})
                return 
            }
        })
        //some stuff here 
    }

    let handlePrimeDurationSubmit = (e)=>{
        e.preventDefault()
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        if(primeDuration === null || primeDuration === '')
        {
            toast.error('Enter Correct Duration')
            return
        }
        console.log(admin_id)
        console.log(data.userId)
        let admin_url = `${props.backend}/api/primeplan/add/${data.userId}/${admin_id}`
        let superuser_url = `${props.backend}/api/primeplan/add/super/${data.userId}/${admin_id}`
        let req_url = false ? admin_url : superuser_url //props.userRole === 'admin'
        axios.post(req_url,{duration:Number(primeDuration)})
        .then((res)=>{
            if(res.status===200)
            {   
               toast.success('Prime Plan Added Successfully!',{position:'top-center'})
               setAddPrimeDiv('false')
               refreshData()
               return 
            }
            else 
            {
                toast.error('something went wrong!',{position:'top-center'})
                return 
            }
        })
        //some stuff here 
    }




    let handleRemove = ()=>{
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        axios.delete(`${props.backend}/api/plan/remove/${data.userId}/${admin_id}`)
        .then(r=>{
            if(r.status===200)
            {
                toast.success('plan removed successfully!',{position:'top-center'})
                refreshData()
                return 
            }
            else 
            {
                toast.error('Something went wrong!',{position:'top-center'})
                return 
            }
        })

    }



    let handlePrimeRemove = ()=>{
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        axios.delete(`${props.backend}/api/primeplan/remove/${data.userId}/${admin_id}`)
        .then(r=>{
            if(r.status===200)
            {
                toast.success('plan removed successfully!',{position:'top-center'})
                refreshData()
                return 
            }
            else 
            {
                toast.error('Something went wrong!',{position:'top-center'})
                return 
            }
        })

    }

    let handleCreatePrime = ()=>{
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        axios.post(`${props.backend}/api/auth/registerprime`,{phoneNumber:data.phoneNumber})
        .then(r=>{
            if(r.status===200)
            {
                toast.success('Prime Account Created!',{position:'top-center'})
                refreshData()
                return 
            }
            else 
            {
                toast.error(r.data.message,{position:'top-center'})
                return 
            }
        })

    }


    let handleUnBlock = ()=>{
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        axios.post(`${props.backend}/api/auth/unblock/${data.userId}/${admin_id}`)
        .then(r=>{
            if(r.status===200)
            {
                toast.success('User Unblocked successfully',{position:'top-center'})
                refreshData()
                return 
            }
            else 
            {
                toast.error('Something went wrong!',{position:'top-center'})
                return 
            }
        })
    }
    let handleBlock = ()=>{
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        axios.post(`${props.backend}/api/auth/block/${data.userId}/${admin_id}`)
        .then(r=>{
            if(r.status===200)
            {
                toast.success('User blocked successfully',{position:'top-center'})
                refreshData()
                return 
            }
            else 
            {
                toast.error('Something went wrong!',{position:'top-center'})
                return 
            }
        })
    }

    let handleLimit = ()=>{
        let admin_id = localStorage.getItem('tg_id')
        if(admin_id === null || admin_id === undefined || admin_id ==='')
        {
            toast.error('Invalid Admin!',{position:'top-center'})
            return 
        }
        if(data===null)
        {
            toast.error('Invalid and Data not fetched!',{position:'top-center'})
            return 
        }
        axios.post(`${props.backend}/api/auth/removelimit/${data.userId}/${admin_id}`)
        .then(r=>{
            if(r.status===200)
            {
                toast.success('Login Limit Removed Successfully!',{position:'top-center'})
                return 
            }
            else 
            {
                toast.error('Something went wrong!',{position:'top-center'})
                return 
            }
        })
    }

    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} />
            <div className="profile-content">
                <div className='user-profile'>
                    <h4>Get User Data</h4>
                    <hr/> 
                    <form onSubmit={handleSubmit} className='d-flex justify-content-center align-items-center'>
                        <input onChange={handlePhone} type="text" placeholder='phone number' value={phone}  />
                        <input type="submit" className='btn btn-primary btn-sm' value="Get User"/>
                    </form>
                </div>
                { flag === true ?  
                <React.Fragment>
                <div className='user-profile'>
                    <h6>user data : </h6>
                    <hr/> 
                    <div className='d-flex justify-content-around align-items-around' style={{fontSize:11,color:'grey'}}>
                        <div className='d-flex flex-column align-items-center justify-content-center' style={{flexGrow:1}}>
                            <span>Phone no : {data.phoneNumber}</span>
                            <span>user id  : {data.userId}</span>
                        </div>
                        <div className='d-flex flex-column align-items-center justify-content-center' style={{flexGrow:1}}>
                            <span>Password : {data.password} </span>
                            <span>Plan : {data.activePlan? 'Active' : 'InActive'}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className='d-flex justify-content-around align-items-center'>
                        <div className='d-flex flex-column align-items-center justify-content-center' style={{flexGrow:1}}>
                            {
                                data.activePlan? <button onClick={()=> handleRemove()} className='btn btn-warning btn-sm vp-btn m-2' >Remove Plan</button> : null
                            }
                            <button onClick={()=>{setAddDiv(true)}} className='btn btn-success btn-sm vp-btn m-2'>Add Plan</button>
                        </div>
                       <div className='d-flex flex-column align-items-center justify-content-center' style={{flexGrow:1}}>
                            { data.accountBlocked === true ? 
                            <button onClick={()=> handleUnBlock()} className='btn btn-info btn-sm vp-btn m-2'>Unblock User</button>
                            :
                            <button onClick={()=> handleBlock()}  className='btn btn-danger btn-sm vp-btn m-2'>Block User</button>
                            } 
                            <button onClick={()=> handleLimit()}  className='btn btn-primary btn-sm vp-btn m-2'>Remove Limit</button>
                       </div>
                    </div>
                </div>

               


                {addDiv === true?
                    <div className='user-profile'>
                        <h4>Add Plan</h4>
                        <hr/> 
                        <form onSubmit={handleDurationSubmit} className='d-flex justify-content-center align-items-center'>
                            <input onChange={handleDuration} type="number" placeholder='Duration' value={duration}  />
                            <input type="submit" className='btn btn-success btn-sm' value="Add Plan"/>
                        </form>
                    </div>
                    
                    : null}
                 {/*prime plan data*/}
                 {
                    props.primeAdmin === true ? 
                        <div className='user-profile'>
                            <h6>Prime Plan Data : </h6>
                            <hr/> 
                            <div className='d-flex justify-content-around align-items-around' style={{fontSize:11,color:'grey'}}>
                                <span>Prime Plan : {data.prime_plan? 'Active' : 'InActive'}</span>
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-around align-items-center'>
                            {
                                data.prime_user === false?
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                     <button onClick={()=> handleCreatePrime()} className='btn btn-warning btn-sm vp-btn m-2' >Create Prime Account</button>
                                </div> :
                                null
                            }
                            {data.prime_user === true ? 
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                    {
                                        data.prime_plan === true? 
                                        <button onClick={()=> handlePrimeRemove()} className='btn btn-danger btn-sm vp-btn m-2' >Remove Prime Plan</button>
                                        : 
                                        <button onClick={()=> {setAddPrimeDiv(true)}} className='btn btn-success btn-sm vp-btn m-2' >Add Prime Plan</button>
                                    }
                                </div>
                            : null}
                            </div>
                        </div>
                    : 
                    null
                }

                {addPrimeDiv === true?
                    <div className='user-profile'>
                        <h4>Add Prime Plan</h4>
                        <hr/> 
                        <form onSubmit={handlePrimeDurationSubmit} className='d-flex justify-content-center align-items-center'>
                            <input onChange={handlePrimeDuration} type="number" placeholder='Duration' value={primeDuration}  />
                            <input type="submit" className='btn btn-success btn-sm' value="Add Prime Plan"/>
                        </form>
                    </div>
                    
                    : null}



                <div className='user-profile'>
                    <h4>Plan Details</h4>
                    <hr/> 
                    <h6>Current Plan</h6>
                    {data.activePlan && data.current_plan !== null ? 
                    <div className='d-flex justify-content-around align-items-center'>
                        <h6 style={{color:'green'}}>Active</h6>
                        <div className='d-flex flex-column align-items-start justify-content-center'>
                            <h4 className='profile-number'>Days Left : {get_days(data.current_plan.end_date)}</h4>
                            <span className='profile-sub'>plan type : {data.current_plan.duration} days</span>
                            <span className='profile-sub'>Start date : {data.current_plan.start_date} </span>
                            <span className='profile-sub'>End Date : {data.current_plan.end_date} </span>
                        </div>
                    </div>
                    :
                        <h6 className='text-center p-2' style={{color:'red'}}>You Don't have Active Plan</h6>
                    }
                    <hr/>
                    
                    <h6>Previous Plans</h6>
                    {data.previous_plans === null   ? <p className='text-center p-4'>No Previous Plans</p> : null}
                    {data.previous_plans && data.previous_plans.length === 0 ? <p className='text-center p-4'>No Previous Plans</p> : null}
                    {data.previous_plans && data.previous_plans.map(plan => 
                        <div className='d-flex justify-content-around align-items-center expired '>
                        <h6 style={{color:'red'}}>Expired</h6>
                        <div className='d-flex flex-column align-items-start justify-content-center'>
                            <span className='profile-sub'>plan type : {plan.duration} days</span>
                            <span className='profile-sub'>Start date : {plan.start_date} </span>
                            <span className='profile-sub'>End Date : {plan.end_date} </span>
                        </div>  
                        </div>
                    )}
                       
                </div>

                {/* show current and previous prime plans data*/}
                {props.primeAdmin === true && data.prime_user === true? 
                <div className='user-profile'>
                        <h4>Prime Plan Details</h4>
                        <hr/> 
                        <h6>Current Prime Plan</h6>
                        {data.prime_plan && data.current_prime_plan !== null ? 
                        <div className='d-flex justify-content-around align-items-center'>
                            <h6 style={{color:'green'}}>Active</h6>
                            <div className='d-flex flex-column align-items-start justify-content-center'>
                                <h4 className='profile-number'>Days Left : {get_days(data.current_prime_plan.end_date)}</h4>
                                <span className='profile-sub'>plan type : {data.current_prime_plan.duration} days</span>
                                <span className='profile-sub'>Start date : {data.current_prime_plan.start_date} </span>
                                <span className='profile-sub'>End Date : {data.current_prime_plan.end_date} </span>
                            </div>
                        </div>
                        :
                            <h6 className='text-center p-2' style={{color:'red'}}>You Don't have Active Plan</h6>
                        }
                        <hr/>
                        
                        <h6>Previous Prime Plans</h6>
                        {data.previous_prime_plans === null   ? <p className='text-center p-4'>No Previous Plans</p> : null}
                        {data.previous_prime_plans && data.previous_prime_plans.length === 0 ? <p className='text-center p-4'>No Previous Plans</p> : null}
                        {data.previous_prime_plans && data.previous_prime_plans.map(plan => 
                            <div className='d-flex justify-content-around align-items-center expired '>
                            <h6 style={{color:'red'}}>Expired</h6>
                            <div className='d-flex flex-column align-items-start justify-content-center'>
                                <span className='profile-sub'>plan type : {plan.duration} days</span>
                                <span className='profile-sub'>Start date : {plan.start_date} </span>
                                <span className='profile-sub'>End Date : {plan.end_date} </span>
                            </div>  
                            </div>
                        )}
                        
                </div>
                : null}

                </React.Fragment>
                : null }
            </div>
            
            <GenericFooter />
        </React.Fragment>
    );
}

export default ManageUser;