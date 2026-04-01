import Button from "../Button/Button"

const Card=({title, srcImg, count, author, btnType, btnColor, btnLable, bgClass, className, style})=>{
    return(
        <div className={`card shadow-sm rounded text-center ${bgClass || ''} ${className || ''}`} style={style}>
            <img src={srcImg} className="card-img-top" alt={srcImg} />
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                {count !== undefined && <p className="card-text">{count}</p>}
                {author && (
                    <p className="card-text"><strong>Author: </strong>{author}</p>
                )}
                
                <Button type={btnType} color={btnColor} label={btnLable} />
            </div>
        </div>
    )
}

export default Card;