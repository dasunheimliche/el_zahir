// import React from "react"


const Entrada = ({type, pl,className, value})=> {
    return (
        <>
            <input className={className} type={type} placeholder={pl} value={value}/>
        </>
    )
}

export default Entrada