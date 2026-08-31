import Card from "../../../../../shared/components/card/Card";
import Button from "../../../../../shared/components/Button/Button";
import Modal from "../../../../../shared/components/modal/Modal";
import FormInput from "../../../../../shared/components/form-inputs/Form-Input";
import MultiSelect from "../../../../../shared/components/form-inputs/Multi-Select";
import { useGetBooks } from "../../hooks/useGetBooks";
import { useUpdateBook } from "../../hooks/useUpdateBook";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {useDeleteBook} from "../../hooks/useDeleteBook";
import { useNavigate } from "react-router-dom";

const BookList = () => {
    const { books, loading, error, getBooks } = useGetBooks();
    const { updateBook } = useUpdateBook();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { deleteBook } = useDeleteBook(); // add this

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // confirmation modal
    const [bookToDelete, setBookToDelete] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const genres = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology'];
    const languages = ['English', 'Hindi', 'Urdu', 'French', 'German'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const navigate=useNavigate();

    // When a book is selected, patch all values into the form
    useEffect(() => {
        if (selectedBook) {
            setValue('title', selectedBook.title);
            setValue('author', selectedBook.author);
            setValue('publisher', selectedBook.publisher);
            setValue('genre', selectedBook.genre);
            setValue('publishyear', selectedBook.publishYear);
            setValue('price', selectedBook.price);
            setValue('isbn', selectedBook.isbn);
            setValue('description', selectedBook.description);
            setValue('quantity', selectedBook.quantity);
            setValue('language', selectedBook.language);
            setImagePreview(
                `${import.meta.env.VITE_BASE_URL}/images/${selectedBook.bookImg}`
            );
        }
    }, [selectedBook]);

    const onEditBook = (book) => {
        setSelectedBook(book);      //store full book object
        setIsEditModalOpen(true);   //open modal
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    }

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('author', data.author);
            formData.append('publisher', data.publisher);
            formData.append('genre', data.genre);
            formData.append('publishYear', data.publishyear);
            formData.append('price', data.price);
            formData.append('isbn', data.isbn);
            formData.append('description', data.description);
            formData.append('quantity', data.quantity);
            formData.append('language', data.language);

            // Only append image if a new one is selected
            if (data.coverImage && data.coverImage[0]) {
                formData.append('coverImage', data.coverImage[0]);
            }

            await updateBook(selectedBook._id, formData);
            await getBooks();  //refresh books

            reset();
            setSelectedBook(null);
            setImagePreview(null);
            setIsEditModalOpen(false);
        } catch (error) {
            console.log('Error updating book =>', error);
        }
    }

    // Open confirmation modal instead of deleting directly
    const onDeleteBook = (book) => {
        setBookToDelete(book);  // sets full object
        setIsDeleteModalOpen(true);
    }

    // Actually delete after confirmation
    const confirmDelete = async () => {
        try {
                    const bookId = bookToDelete._id || bookToDelete.id;
        console.log('Deleting book with id =>', bookId);

            await deleteBook(bookToDelete._id);
            await getBooks(); // ✅ refresh list
            setIsDeleteModalOpen(false);
            setBookToDelete(null);
        } catch (error) {
            console.log('Error deleting book =>', error);
        }
    }

    return (
        <div className="container mt-3">

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            {!loading && !error && books.length === 0 && (
                <p className="text-center">No books found</p>
            )}

            <div className="row gap-3">
                {!loading && books.map((book) => (
                    <Card
                        key={book._id}
                        srcImg={`${import.meta.env.VITE_BASE_URL}/images/${book.bookImg}`}
                        title={book.title}
                        author={book.author}
                        className="h-75"
                        imgStyle={{ maxHeight: 350 + 'px' }}
                        style={{ maxWidth: 300 + 'px' }}
                    >
                        {/* Pass full book object to onEditBook */}
                        <Button type="button" color="info" label="View"
                            onClick={() => navigate(`/admin/bookDetails/${book._id}`)} />
                        <Button type="button" color="primary" label="Edit"
                            onClick={() => onEditBook(book)} />
                        <Button type="button" color="danger" label="Delete"
                            onClick={() => onDeleteBook(book)} />
                    </Card>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Book"
                isOpen={isDeleteModalOpen}
                onClose={() => { setIsDeleteModalOpen(false); setBookToDelete(null); }}
            >
                <div className="text-center">
                    <i className="fa fa-exclamation-triangle text-danger"
                        style={{ fontSize: '3rem' }} aria-hidden="true"></i>
                    <h5 className="mt-3">Are you sure you want to delete?</h5>
                    <p className="text-muted">
                        <strong>{bookToDelete?.title}</strong> will be permanently deleted.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button type="button" color="secondary" label="Cancel"
                            onClick={() => { setIsDeleteModalOpen(false); setBookToDelete(null); }} />
                        <Button type="button" color="danger" label="Yes, Delete"
                            onClick={confirmDelete} />
                    </div>
                </div>
            </Modal>

            {/* Edit Modal — same structure as Add Book modal */}
            <Modal title="Edit Book" isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false); reset(); setSelectedBook(null); }}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormInput type="text" label="Title" placeholder="Title" name="title"
                        register={register} rules={{ required: "Title is required" }}
                        error={errors.title} />

                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            <FormInput type="text" label="Author" placeholder="Author" name="author"
                                register={register} rules={{ required: "Author is required" }}
                                error={errors.author} />
                        </div>
                        <div className="col-md-6">
                            <FormInput type="text" label="Publisher" placeholder="Publisher" name="publisher"
                                register={register} rules={{ required: "Publisher is required" }}
                                error={errors.publisher} />
                        </div>
                    </div>

                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            <MultiSelect label="Genre" name="genre" options={genres}
                                register={register} rules={{ required: "Genre is required" }}
                                error={errors.genre} />
                        </div>
                        <div className="col-md-6">
                            <MultiSelect label="Publish Year" name="publishyear" options={years}
                                register={register} rules={{ required: "Publish Year is required" }}
                                error={errors.publishyear} />
                        </div>
                    </div>

                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            <FormInput type="text" label="Price" placeholder="Price" name="price"
                                register={register} rules={{ required: "Price is required" }}
                                error={errors.price} />
                        </div>
                        <div className="col-md-6">
                            <FormInput type="text" label="ISBN" placeholder="ISBN" name="isbn"
                                register={register} rules={{ required: "ISBN is required" }}
                                error={errors.isbn} />
                        </div>
                    </div>

                    <FormInput type="textarea" label="Description" placeholder="Description"
                        name="description" register={register}
                        rules={{ required: "Description is required" }}
                        error={errors.description} />

                    {/* Cover Image */}
                    <div className="mb-4 d-md-flex justify-content-between gap-5">
                        <div className="col-md-6">
                            <label className="form-label">Cover Image</label>
                            <input type="file" className="form-control" accept="image/*"
                                {...register("coverImage")}  // not required for update
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="col-md-6">
                            {/* Shows existing image or new preview */}
                            {imagePreview && (
                                <img src={imagePreview} alt="Cover Preview"
                                    className="img-fluid mt-2 rounded"
                                    style={{ maxHeight: '75px', objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            <FormInput type="text" label="Quantity" placeholder="Quantity"
                                name="quantity" register={register}
                                rules={{ required: "Quantity is required" }}
                                error={errors.quantity} />
                        </div>
                        <div className="col-md-6">
                            <MultiSelect label="Language" name="language" options={languages}
                                register={register} rules={{ required: "Language is required" }}
                                error={errors.language} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button type="button" label="Cancel" color="danger"
                            onClick={() => { setIsEditModalOpen(false); reset(); }} />
                        <Button type="submit" label="Update" color="success" />
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default BookList;