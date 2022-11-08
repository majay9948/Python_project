import React from 'react' 
import {MdSportsCricket,MdOutlineSportsSoccer,MdSportsBasketball,MdSportsKabaddi} from 'react-icons/md'


function NavBarThree(props){
    
    function handleCricket()
    {
       props.setSportIndex(0)
    }
    function handleKabaddi()
    {
        props.setSportIndex(3)
    }
    function handleFootball()
    {
        props.setSportIndex(1)

    }
    function handleBasketball()
    {
        props.setSportIndex(2)

    }

    return (
        <React.Fragment>
            <nav class="d-flex justify-content-around top-nav  pt-1 top-fix-two" style={{backgroundColor:'#fff'}}>
                <div onClick={handleCricket} className={props.sportIndex === 0 ? 'sport-icon sport-icon-active':'sport-icon'}>
                    <MdSportsCricket size={20} />
                    <span>Cricket</span>
                </div>
                <div onClick={handleFootball} className={props.sportIndex === 1 ? 'sport-icon sport-icon-active':'sport-icon'}>
                    <MdOutlineSportsSoccer size={20} /> 
                    <span>Football</span>
                </div>
                <div onClick={handleBasketball} className={props.sportIndex === 2 ? 'sport-icon sport-icon-active':'sport-icon'}>
                    <MdSportsBasketball size={20}  />
                    <span>Basketball</span>
                </div>
                <div onClick={handleKabaddi} className={props.sportIndex === 3 ? 'sport-icon sport-icon-active':'sport-icon'}>
                    <MdSportsKabaddi size={20}  />
                    <span>Kabaddi</span>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavBarThree;