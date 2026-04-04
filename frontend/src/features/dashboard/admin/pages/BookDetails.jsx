import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleBook } from "../../admin/hooks/useGetSingleBook";
import Button from "../../../../shared/components/Button/Button";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { book, loading, error } = useGetSingleBook(id);

    if (loading) return <div className="container mt-5"><p className="text-center">Loading...</p></div>;
    if (error) return <div className="container mt-5"><p className="text-center text-danger">{error}</p></div>;
    if (!book) return null;

    return (
        <div className="container mt-4">
            {/* <Button type="button" color="secondary" label={
                <span><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</span>
            } onClick={() => navigate(-1)} /> */}

            <div className="row">
                {/* Left — Book Cover */}
                <div className="col-md-4 text-center">
                    <img
                        src={`${import.meta.env.VITE_BASE_URL}/images/${book.bookImg}`}
                        alt={book.title}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                </div>

                {/* Right — Book Info */}
                <div className="col-md-8">
                    <h2 className="mb-1">{book.title}</h2>
                    <p className="text-muted mb-3">by <strong>{book.author}</strong></p>

                    <hr />

                    <div className="row mt-3">
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">Publisher</small>
                            <p className="mb-0"><strong>{book.publisher}</strong></p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">Genre</small>
                            <p className="mb-0"><strong>{book.genre}</strong></p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">Publish Year</small>
                            <p className="mb-0"><strong>{book.publishYear}</strong></p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">Language</small>
                            <p className="mb-0"><strong>{book.language}</strong></p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">ISBN</small>
                            <p className="mb-0"><strong>{book.isbn}</strong></p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">Price</small>
                            <p className="mb-0"><strong>₹ {book.price}</strong></p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">Quantity in Stock</small>
                            <p className="mb-0"><strong>{book.quantity}</strong></p>
                        </div>
                        <div className="col-md-6 mb-3">
                            <small className="text-muted">Added On</small>
                            <p className="mb-0"><strong>{new Date(book.createdAt).toLocaleDateString()}</strong></p>
                        </div>
                    </div>

                    <hr />

                    <div className="mt-3">
                        <small className="text-muted">Description</small>
                        <p className="mt-1">{book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;