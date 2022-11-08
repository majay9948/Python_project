import React from 'react' 
import './filter.css'
import {MdClose} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'

const FilterChip = (props)=>{
    return (
        <React.Fragment>
            <div className='chip'>
                {props.children} &nbsp;
                <AiFillEdit onClick={()=> props.handleEdit(props.index)} style={{color:'blue'}} size={20} /> &nbsp;
                <MdClose onClick={()=> props.handleClose(props.index)} style={{color:'red'}} size={20} />
            </div>
        </React.Fragment>
    );
}

export default FilterChip;