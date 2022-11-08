import React from 'react'


const MiniSideHeading = (props)=>{
    return (
        <React.Fragment>
            <div className="d-flex justify-content-start align-items-center mini-side-heading">
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default MiniSideHeading;