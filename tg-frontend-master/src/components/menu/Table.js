import React from 'react'  
import {HiOutlineExternalLink} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'



const Table = (props)=>{
    let navigate = useNavigate()
    let handleTableClick = (ftype,fvalue)=>{
        console.log(ftype,fvalue)
        navigate(`/display/${props.match}/${props.attempt}/${ftype}/${fvalue}`)
        return;
    }
    return (
        <React.Fragment>
        <div className='analytic-section'>
                <div style={{textAlign:'center',padding:5}}>
                    <h4>{props.header}</h4>
                </div>
                <table class="table" style={{textAlign:'center'}}>
                    <thead class="thead-light">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">{props.name}</th>
                        <th scope="col">No.Teams</th>
                        <th scope="col">% </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           props.data[0].map((name,index)=>{
                                return <tr>
                                <th scope="row">
                                   <div className='d-flex justify-content-center align-items-center'>
                                    <span>{index+1}</span>
                                    {props.data[3].length >0? 
                                        <HiOutlineExternalLink style={{color:'blue',marginLeft:2}} size={20} onClick={()=> {handleTableClick(props.filterType,props.data[3][index])}} />
                                        : null}
                                   
                                   </div>
                                </th>
                                <td>{name}</td>
                                <td>{props.data[1][index]}</td>
                                <td>{props.data[2][index]}</td>
                            </tr>
                           })
                       }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default Table;