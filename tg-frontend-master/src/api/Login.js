import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import GenericFooter from '../components/footer/GenericFooter';
import NavBarFour from '../components/navbar/NavBarFour';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = (props)=>{
   
    let navigate = useNavigate()
    let [phone,setPhone] = useState('')
    let [password,setPassword] = useState('')
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return 
        }

    },[])
    let handlePhone = (e)=>{
        setPhone(e.target.value)
    }
    let handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        console.log(password)
        console.log(phone)
        if(password.length<5)
        {
            toast.error('Password length should be more than 5',{position:'top-center'})
            return 
        }
       
        if(phone.length!==10)
        {
            toast.error('Enter Valid Phone Number',{position:'top-center'})
            return 
        }
        axios.post(`${props.backend}/api/auth/login`,{
            phoneNumber:phone,
            password:password
        })
        .then(response =>{
            if(response.status === 200)
            {
                
                let data = response.data.data 
                let changedPassword = data.changedPassword 
                localStorage.setItem('ph_number',data.phoneNumber)
                if(changedPassword===false)
                {
                    localStorage.setItem('temp_id',data.id)
                    toast.success('Login Successful! Kindly Change your Password',{position:'top-center'})
                    navigate('/changepassword')
                    return 
                }
                else 
                {
                    localStorage.setItem('tg_id',data.id)
                   
                    props.setLogin(true)
                    axios.get(`${props.backend}/api/plan/status/${data.id}`)
                    .then(res=>{
                        if(res.status === 200)
                        {
                            let data= res.data.data 
                            props.setPlan(data.plan)
                            props.setUserName(data.name)
                            props.setUserRole(data.user_role)
                            props.setPhoneNumber(data.phoneNumber)
                            props.setUserEmail (data.email)
                            props.setCurrentPlan(data.current_plan)
                            props.setPreviousPlan(data.previous_plans)
                            toast.success('Login Successfully Verfified',{position:'top-center'})
                            navigate('/')
                            return 
                        }
                        else 
                        {
                            navigate('/')
                        }
                    })
                }
            }
            else 
            {
                if(response.status=== 201)
                {
                    toast.error(response.data.message,{position:'top-center'})
                    return 
                }
            }
        })
    }
    return (
        <React.Fragment>
        <NavBarFour  navigate={navigate}  />
            <div className='mini-container' style={{padding:5}}>
            <div className='card mt-4'>
                <div className='card-header text-center'>Team Generation</div>
                <div className='card-body'>
                    <h3 className='text-center'>Login Here</h3>
                    <div className='text-center'>
                        <span style={{color:"grey",fontSize:12}}>This is a Premium Version software with <b>91.2%</b> Accuracy ,
                        to get this software contact us &nbsp;</span> 
                        {/* change have to be made here */}
                        { /*<p>Offcial partner ChiruRK9</p> */}
                        <p style={{fontWeight:500,color:'green'}}>Whatsapp : {props.adminPhoneNumber}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group mt-3 mb-3">
                        <label for="exampleInputEmail1">Phone Number</label>
                        <input onChange={handlePhone} type="text" class="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Phone Number"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your number with anyone else.</small>
                        </div>
                        <div class="form-group mt-3 mb-3">
                        <label for="exampleInputPassword1">Password</label>
                        <input onChange={handlePassword} type="password" required class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                    
                        <button type="submit" class="btn btn-primary">Login</button>
                  </form>
                </div>
            </div>
            </div>
            <GenericFooter /> 
        </React.Fragment>
    );
}

export default Login; 