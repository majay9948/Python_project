import React,{useEffect} from 'react' 
import {useNavigate} from 'react-router-dom'
import Footer from '../footer/Footer';
import NavBarOne from '../navbar/NavBarOne';
import NavBarThree from '../navbar/NavBarThree';


const MyMatches = (props)=>{
    let navigate = useNavigate()
    useEffect(()=>{
        if(props.reload === null )
        {
            navigate('/')
            return
        }
    },[])
    return (
        <React.Fragment>
            <div className="content">
                <NavBarOne  backend={props.backend} />
                <NavBarThree
                cricket={props.cricket} 
                football={props.football} 
                basketball={props.basketball}
                setCricket = {props.setCricket} 
                setFootball ={props.setFootball} 
                setBasketball={props.setBasketball}
                />
               <div className="sub-content">
               <h4 class="sub-heading">My Matches</h4>
               <p>
               60 15 I have a seemingly trivial question about props and functional components. Basically, I have a container component which renders a Modal component upon state change which is triggered by user click on a button. The modal is a stateless functional component that houses some input fields which need to connect to functions living inside the container component.
My question: How can I use the functions living inside the parent component to change state while the user is interacting with form fields inside the stateless Modal component? Am I passing down props incorrectly? Thanks in advance. 60 15
I have a seemingly trivial question about props and functional components. Basically, I have a container component which renders a Modal component upon state change which is triggered by user click on a button. The modal is a stateless functional component that houses some input fields which need to connect to functions living inside the container component.
My question: How can I use the functions living inside the parent component to change state while the user is interacting with form fields inside the stateless Modal component? Am I passing down props incorrectly? Thanks in advance.

               </p>
               </div>
            </div>
            <Footer 
                one={props.one}
                two={props.two}
                three={props.three}
                setOne={props.setOne}
                setTwo={props.setTwo}
                setThree={props.setThree}
            />
        </React.Fragment>
    );
}

export default MyMatches;