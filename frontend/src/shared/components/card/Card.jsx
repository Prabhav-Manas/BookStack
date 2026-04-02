import Button from "../Button/Button"

const Card=({title, srcImg, count, author, btnType, btnColor, btnLable, bgClass, className, style, imgStyle, children})=>{
    return(
        <div className={`card shadow-sm rounded text-center ${bgClass || ''} ${className || ''}`} style={style}>
            <img src={srcImg} className="card-img-top img-fluid" alt={srcImg} style={imgStyle} />
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                {count !== undefined && <p className="card-text">{count}</p>}
                {author && (
                    <p className="card-text"><strong>Author: </strong>{author}</p>
                )}
                
                <div className="d-flex justify-content-between align-items-center">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card;