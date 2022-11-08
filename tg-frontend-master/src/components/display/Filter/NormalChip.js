import React from 'react' 
import './filter.css'
import {MdClose} from 'react-icons/md'


let NormalChip = (props)=>{
    return (
        <React.Fragment>
            <div className='chip'>
                {props.children} &nbsp;
                <MdClose onClick={()=> props.handleClose(props.value)} style={{color:'red'}} size={20} />
            </div>
        </React.Fragment>
    );
}

export default NormalChip;