import React from 'react' 
import { useNavigate } from 'react-router'
import { MdHome,MdOutlineHistory,MdPerson} from 'react-icons/md'


const Footer = (props)=>{
    const navigate = useNavigate()
   
    function handleOne()
    {
        props.setBottomIndex(0)
        navigate('/')
    }
    function handleTwo()
    {
        props.setBottomIndex(1)
        navigate('/mymatches')
    }
    function handleThree()
    {
        props.setBottomIndex(2)
        navigate('/profile')
    }


    return (
        <React.Fragment>
        <div className="footer container d-flex justify-content-around pt-2" style={{maxWidth:600,padding:0}}>
            <div onClick={handleOne} className={props.bottomIndex ===0 ? 'sport-icon sport-icon-active':'sport-icon'}>
                <MdHome size={20} />
                <span>Home</span>
            </div>
            <div onClick={handleTwo} className={props.bottomIndex ===1 ? 'sport-icon sport-icon-active':'sport-icon'}>
                <MdOutlineHistory size={20} /> 
                <span>My matches</span>
            </div>
            <div onClick={handleThree} className={props.bottomIndex ===2 ? 'sport-icon sport-icon-active':'sport-icon'}>
                <MdPerson size={20}  />
                <span>User</span>
            </div>
        </div>
        </React.Fragment>
    );
}

export default Footer;