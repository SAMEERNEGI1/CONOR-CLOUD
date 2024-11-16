import React from 'react'

function Alert(props) {
    const capitilize=(word)=>{
        if(word==="danger"){
            word="error"
        }
        const lower=word.toLowerCase()
        return lower.charAt(0).toUpperCase()+lower.slice(1)
    }
    return (
    
            props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitilize(props.alert.type)}</strong>: {props.alert.message}

            </div>

    )
}
export default Alert
