import React from 'react'
import LoadingImage from '../assets/loading.gif'

function Loading() {
    return (
        <center style={{display:"grid",placeItems:"center",height:"100vh"}}>
            <div>
                <img src={LoadingImage}
                
                style={{ height:"200px" ,width:"200px", objectFit:"contain"}}

                />
            </div>
        </center>
    )
}

export default Loading
