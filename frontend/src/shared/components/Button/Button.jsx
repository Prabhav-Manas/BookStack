const Button=({type, color, label})=>{
    return(
        <button type={type} className={`btn btn-${color}`}>{label}</button>
    )
}

export default Button