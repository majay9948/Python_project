import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import GenericFooter from '../components/footer/GenericFooter';
import NavBarTwo from '../components/navbar/NavBarTwo';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangePassword = (props)=>{
    let navigate = useNavigate()
    let [name,setName] = useState('')
    let [email,setEmail] = useState('')
    let [password,setPassword] = useState('')
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return 
        }
    },[])
    let handleName = (e)=>{
        setName(e.target.value)
    }
    let handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    let handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        if(password.length<5)
        {
            toast.error('Password length should be more than 5',{position:'top-center'})
            return 
        }
        if(name.length<5)
        {
            toast.error('Name length should be more than 5',{position:'top-center'})
            return 
        }
        if(email.length<5)
        {
            toast.error('Email length should be more than 5',{position:'top-center'})
            return 
        }
        let temp_id = localStorage.getItem('temp_id')
        axios.put(`${props.backend}/api/auth/change_password/${temp_id}`,{name:name,email:email,password:password})
        .then(res => {
            if(res.status===200)
            {
                localStorage.setItem('tg_id',temp_id)
                props.setLogin(true)
                axios.get(`${props.backend}/api/plan/status/${temp_id}`)
                .then(response =>{
                    let data = response.data.data 
                    if(response.status === 200)
                    {
                        props.setPlan(data.plan)
                        props.setUserName(data.name)
                        props.setUserRole(data.user_role)
                        props.setUserEmail (data.email)
                        props.setPhoneNumber(data.phoneNumber)
                        props.setCurrentPlan(data.current_plan)
                        props.setPreviousPlan(data.previous_plans)
                        toast.success('Password Changed Successfully!',{position:'top-center'})
                        navigate('/')
                        return 
                    }
                    else 
                    {
                        toast.error('Something Went Wrong!',{position:'top-center'})
                        
                        navigate('/')
                        return 
                    }
                })
            }
            else if(res.status === 201) 
            {
                toast.error(res.data.message,{position:'top-center'})
                return 
            }
            else 
            {
                toast.error('Something went wrong!',{position:'top-center'})
                navigate('/')

            }
        })
    }
    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} /> 
            <div className='mini-container' style={{padding:5}}>
            <div className='card mt-4'>
                <div className='card-header text-center'>Team Generation</div>
                <div className='card-body'>
                    <h3 className='text-center'>Change Password</h3>
                    <div className='text-center'>
                        <span style={{color:"grey",fontSize:12}}>Kindly Change your password and also add your data </span> 
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group mt-3 mb-3">
                        <label for="exampleInputEmail1">Name</label>
                        <input onChange={handleName} type="text" class="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your data with anyone else.</small>
                        </div>
                        <div class="form-group mt-3 mb-3">
                        <label for="exampleInputEmail1">Email </label>
                        <input onChange={handleEmail} type="email" class="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your data with anyone else.</small>
                        </div>
                        <div class="form-group mt-3 mb-3">
                        <label for="exampleInputPassword1">Password</label>
                        <input onChange={handlePassword} type="password" required class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                    
                        <button type="Change Password" class="btn btn-primary">Login</button>
                  </form>
                </div>
            </div>
            </div>
            <GenericFooter /> 
        </React.Fragment>
    );
}

export default ChangePassword; 