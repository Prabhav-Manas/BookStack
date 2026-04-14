import { useNavigate } from "react-router-dom";
import { useGetAllBooks } from "../hooks/useGetAllBooks";
import Button from "../../../../shared/components/Button/Button";
import Card from "../../../../shared/components/card/Card";
import Modal from "../../../../shared/components/modal/Modal";
import { useState } from "react";

const UserDashboard = () => {
    const { books, loading, error } = useGetAllBooks();
    const navigate = useNavigate();
    const [isComingSoonModal, setIsComingSoonModal] = useState(false);

    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-12 text-center py-5 bg-light rounded shadow-sm">
                    <h1>Welcome to BookStack 📚</h1>
                    <p className="text-muted">Explore and discover your next great read</p>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <h2>Available Books</h2>
                </div>
            </div>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            {!loading && !error && books.length === 0 && (
                <p className="text-center">No books available</p>
            )}

            <div className="row gap-3">
                {!loading && books.map((book) => (
                    console.log('My Books:=>', book._id),
                    <Card
                        key={book._id}
                        srcImg={`${import.meta.env.VITE_BASE_URL}/images/${book.bookImg}`}
                        title={book.title}
                        author={book.author}
                        className="h-75"
                        imgStyle={{ maxHeight: 350 + 'px' }}
                        style={{ maxWidth: 300 + 'px' }}
                    >
                        <Button type="button" color="info" label="View"
                            onClick={() => navigate(`/user/book-review/${book._id}`)} />
                    </Card>
                ))}
            </div>

            {/* Coming Soon Modal */}
            {/* <Modal
                title="Coming Soon"
                isOpen={isComingSoonModal}
                onClose={() => setIsComingSoonModal(false)}
            >
                <div className="text-center py-3">
                    <i className="fa fa-rocket"
                        style={{ fontSize: '3rem', color: '#0d6efd' }}
                        aria-hidden="true">
                    </i>
                    <h4 className="mt-3">This Feature is Coming Soon!</h4>
                    <p className="text-muted mt-2">
                        We are working hard to bring you the full book details experience.
                        Stay tuned!
                    </p>
                    <div className="mt-4">
                        <Button type="button" color="primary" label="OK"
                            onClick={() => setIsComingSoonModal(false)} />
                    </div>
                </div>
            </Modal> */}
        </div>
    )
}

export default UserDashboard;