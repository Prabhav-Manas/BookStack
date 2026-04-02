const Button=({type, color, label, onClick})=>{
    return(
        <button type={type} className={`btn btn-${color}`} onClick={onClick}>{label}</button>
    )
}

export default Button