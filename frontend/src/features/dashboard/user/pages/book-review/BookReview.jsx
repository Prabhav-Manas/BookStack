import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBook } from "../../hooks/useGetSingleBook";
import Button from "../../../../../shared/components/Button/Button";

const BookReview=()=>{
    const {id}=useParams();
    const {singleBook, loading, error}=useGetSingleBook(id);

    const navigate=useNavigate();

    if(loading) return <div className="container"><h3 className="">Loading...</h3></div>
    if(error) return <div className=""><p className="">{error}</p></div>
    if(!singleBook) return null;

    console.log('Single BookReview:=>', singleBook);

    return(
        <div className="container mt-4">
            <div className="row d-md-flex justify-content-around">
                <div className="col-md-4">
                    <img src={`${import.meta.env.VITE_BASE_URL}/images/${singleBook.bookImg}`} alt={singleBook.title} className="img-fluid" />
                </div>

                <div className="col-md-8">
                    <h2 className="">{singleBook.title}</h2>
                    <div className="d-flex flex-column">  
                        <small className="my-2 text-success fw-bold">By: {singleBook.author}</small>
                        <small className="mb-4"><strong className="text-danger">Publisher: </strong>{singleBook.publisher}</small>
                    </div>
                    <p className="">{singleBook.description}</p>
                    <h4><strong>Price: </strong>{singleBook.price}</h4>

                    <div className="mt-4 d-md-flex justify-content-around">
                        <Button type="button" color="primary" label="Add Cart" onClick={()=>navigate("/user/cart")} />
                        <Button type="button" color="success" label="Buy Now" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookReview;