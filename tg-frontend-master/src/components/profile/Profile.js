import React,{useEffect} from 'react'  
import { useNavigate } from 'react-router-dom'
import NavBarOne from '../navbar/NavBarOne'
import Footer from '../footer/Footer'
import {MdVerified} from 'react-icons/md'

const Profile = (props)=>{
    let navigate = useNavigate()
    useEffect(()=>{
        if(props.reload === null )
        {
            navigate('/')
            return
        }     
        if(props.login === false)
        {
            navigate('/login')
            return 
        }
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
    let handleLogout = ()=>{
        localStorage.removeItem('tg_id')
        localStorage.removeItem('temp_id')
        localStorage.removeItem('ph_number')
        props.setLogin(false)
        props.setPlan(false)
        props.setCurrentPlan(null)
        props.setPreviousPlan(null)
        props.setUserRole('')
        props.setPhoneNumber('')
        props.setUserName('')
        props.setUserEmail('')
        navigate('/')

    }
    return (
        <React.Fragment>
            <NavBarOne userRole={props.userRole} backend={props.backend} />
            <div className="profile-content">
                <div className='user-profile'>
                    <div className='d-flex justify-content-between'>
                    <h4>User Profile</h4>
                    {/* <button onClick={() => handleLogout()} className='btn btn-primary btn-sm'>Logout</button> */}
                    </div>
                    
                    <hr/> 
                    <div className='d-flex justify-content-around align-items-center'>
                        <img className='team-image-big' src="/0.jpg" alt="profile" />
                        <div className='d-flex flex-column align-items-start justify-content-center'>
                            <div className='d-flex align-items-center'>
                            <span className='profile-number'>{props.phoneNumber} </span>
                            <MdVerified size={20} style={{color:'blue'}} />
                            </div>
                            <span className='profile-sub'>{props.userName}</span>
                            <span className='profile-sub'>{props.userEmail}</span>
                        </div>
                    </div>
                </div>
                <div className='user-profile'>
                    <h4>Plan Details</h4>
                    <hr/> 
                    <h6>Current Plan</h6>
                    {props.plan===true && props.currentPlan !== null ? 
                    <div className='d-flex justify-content-around align-items-center'>
                        <h6 style={{color:'green'}}>Active</h6>
                        <div className='d-flex flex-column align-items-start justify-content-center'>
                            <h4 className='profile-number'>Days Left : {get_days(props.currentPlan.end_date)}</h4>
                            <span className='profile-sub'>plan type : {props.currentPlan.duration} days</span>
                            <span className='profile-sub'>Start date : {props.currentPlan.start_date} </span>
                            <span className='profile-sub'>End Date : {props.currentPlan.end_date} </span>
                        </div>
                    </div>
                    :
                        <h6 className='text-center p-2' style={{color:'red'}}>You Don't have Active Plan</h6>
                    }
                    <hr/>
                    <h6>Previous Plans</h6>
                    {props.previousPlan === null ? <p className='text-center p-4'>No Previous Plans</p> : null}
                    {props.previousPlan && props.previousPlan.length === 0 ? <p className='text-center p-4'>No Previous Plans</p> : null}
                    {props.previousPlan && props.previousPlan.map(plan => 
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

                {/*prime plan stuff*/}
                {props.primeUser === true ?  
                <div className='user-profile'>
                    <h4>Prime Plan Details</h4>
                    <hr/> 
                    <h6>Current Prime Plan</h6>
                    {props.primePlan===true && props.currentPrimePlan !== null ? 
                    <div className='d-flex justify-content-around align-items-center'>
                        <h6 style={{color:'green'}}>Active</h6>
                        <div className='d-flex flex-column align-items-start justify-content-center'>
                            <h4 className='profile-number'>Days Left : {get_days(props.currentPrimePlan.end_date)}</h4>
                            <span className='profile-sub'>plan type : {props.currentPrimePlan.duration} days</span>
                            <span className='profile-sub'>Start date : {props.currentPrimePlan.start_date} </span>
                            <span className='profile-sub'>End Date : {props.currentPrimePlan.end_date} </span>
                        </div>
                    </div>
                    :
                        <h6 className='text-center p-2' style={{color:'red'}}>You Don't have Active Plan</h6>
                    }
                    <hr/>
                    <h6>Previous Prime Plans</h6>
                    {props.previousPrimePlan === null ? <p className='text-center p-4'>No Previous Plans</p> : null}
                    {props.previousPrimePlan && props.previousPrimePlan.length === 0 ? <p className='text-center p-4'>No Previous Plans</p> : null}
                    {props.previousPrimePlan && props.previousPrimePlan.map(plan => 
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

            

            </div>
            <Footer
                bottomIndex = {props.bottomIndex}
                setBottomIndex = {props.setBottomIndex}
            />
        </React.Fragment>
    );
}

export default Profile;