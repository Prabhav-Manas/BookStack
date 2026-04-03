import Button from "../../../../../shared/components/Button/Button";
import "./BooksTable.css";
import AtomicHabitsImg from "../../../../../assets/images/Atomic-Habits.jpg";
import TheAlchemistImg from "../../../../../assets/images/The-Alchemist.jpg";
import RichDadPoorDadImg from "../../../../../assets/images/Rich-Dad-Poor-dad.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../../../shared/components/modal/modal";
import FormInput from "../../../../../shared/components/form-inputs/Form-Input";
import { useForm } from "react-hook-form";
import MultiSelect from "../../../../../shared/components/form-inputs/Multi-Select";

const BooksTable = () => {
    const [isModalOpen, setIsModalOpen]=useState(false);
    const{register, handleSubmit, reset, setValue, formState:{errors}}=useForm()

    const [imagePreview, setImagePreview] = useState(null);

    const genres = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology'];
    const languages = ['English', 'Hindi', 'Urdu', 'French', 'German'];

    const currentYear=new Date().getFullYear();
    const year=Array.from({length:100}, (_, i)=>currentYear-i)

    const navigate=useNavigate();

    const onViewAllBooks=()=>{
        navigate('/admin/bookList');
    }

    const handleTitleChange=(event)=>{
        let value=event.target.value
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/^\s+/g, '')
        .replace(/\s{2,}/g, ' ');

        setValue("title", value, {
            shouldValidate:true,
            shouldDirty:true
        })
    }

    const handleAuthorChange=(event)=>{
        let value=event.target.value
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/^\s+/g, '')
        .replace(/\s{2,}/g, ' ');

        setValue("author", value, {
            shouldValidate:true,
            shouldDirty:true
        })
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const handlePublishedYear = (event) => {
        let value = event.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        setValue("publishedYear", value, { shouldValidate: true, shouldDirty: true });
    }

    const handleISBN = (event) => {
        let value = event.target.value
            .replace(/[^0-9X]/g, '')  // only allow digits and X
            .slice(0, 13);             // max 13 characters
        setValue("isbn", value, { shouldValidate: true, shouldDirty: true });
    }

    const handlePrice = (event) => {
        let value = event.target.value.replace(/[^0-9.]/g, '');
        setValue("price", value, { shouldValidate: true, shouldDirty: true });
    }

    const handleDescription = (event) => {
        let value = event.target.value.replace(/^\s+/g, '').replace(/\s{2,}/g, ' ');
        setValue("description", value, { shouldValidate: true, shouldDirty: true });
    }

    const handleQuantity = (event) => {
        let value = event.target.value.replace(/[^0-9]/g, '');
        setValue("quantity", value, { shouldValidate: true, shouldDirty: true });
    }

    const handlePublisher = (event) => {
        let value = event.target.value
            .replace(/[^a-zA-Z\s]/g, '')
            .replace(/^\s+/g, '')
            .replace(/\s{2,}/g, ' ');
        setValue("publisher", value, { shouldValidate: true, shouldDirty: true });
    }

    const onSubmit=(data)=>{
        console.log('Add Book:=>', data);

        reset();
        setImagePreview(null);
        setIsModalOpen(false);
    }

    return (
        <div className="row gap-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-sm-flex justify-content-between align-items-center gap-5">
                    <h2 className="">Books Table</h2>
                    <p className="mt-3 viewAll" onClick={onViewAllBooks}>View All <i className="fa fa-long-arrow-right" aria-hidden="true"></i></p>
                </div>

                <Button type="button" color="success" 
                label={
                    <span>
                        <span style={{ fontSize: '1.5rem', marginRight: '8px', lineHeight: '0' }}>+</span> 
                        Add Book
                    </span>
                } onClick={()=>setIsModalOpen(true)} />
            </div>

            <Modal title="Add Book" isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Book Title */}
                    <FormInput type="text" label="Title" placeholder="Title" name="title" 
                    register={register} 
                    rules={{required:"Book Title is required"}} 
                    onChange={handleTitleChange} error={errors.title} />
                    
                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            {/* Author */}
                            <FormInput label='Author' type="text" placeholder="Author" name="author"
                            register={register}
                            rules={{required:"Author name is required"}}
                            onChange={handleAuthorChange} error={errors.author} />
                        </div>

                        <div className="col-md-6">
                            {/* Publisher  */}
                            <FormInput type="text" label="Publisher" placeholder="Publisher" name="publisher"
                            register={register}
                            rules={{required:"Publisher is reuired"}}
                            onChange={handlePublisher} error={errors.publisher} />
                        </div>
                    </div>

                    
                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            {/* Genere */}
                            <MultiSelect label="Genre" name="genre" options={genres} register={register}
                            rules={{ required: "Genre is required" }}
                            error={errors.genre} />
                        </div>

                        <div className="col-md-6">
                            {/* Published Year */}
                            <MultiSelect label="Publish Year" name="publishyear" options={year} register={register}
                            rules={{ required: "Publish Year is required" }}
                            error={errors.publishyear} />
                        </div>
                    </div>

                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            {/* Price */}
                            <FormInput type="text" label="Price" placeholder="Price" name="price"
                            register={register}
                            rules={{required:"Price is reuired", pattern:{value:/^[0-9]+$/, message:'Invalid Price'}}}
                            onChange={handlePrice} error={errors.price} />
                        </div>

                        <div className="col-md-6">
                            {/* ISBN  */}
                            <FormInput type="text" label='ISBN' name="isbn" placeholder="ISBN"
                            register={register}
                            rules={{require:"ISBN is required", 
                            pattern:{
                                value:/^(?:\d{9}[\dX]|\d{13})$/,
                                message: "Invalid ISBN. Enter 10 digits (ISBN-10) or 13 digits (ISBN-13)"
                            }}}
                            onChange={handleISBN} error={errors.isbn} />
                        </div>
                    </div>

                    {/* Description  */}
                    <FormInput type="textarea" label="Description" placeholder="Description" name="description"
                    register={register}
                    rules={{required:"Description is reuired"}}
                    onChange={handleDescription} error={errors.description} />

                    {/* Cover Image */}
                    {/* File input + preview */}
                    <div className="mb-4 d-md-flex justify-content-between gap-5">
                        <div className="col-md-6">
                        <label className="form-label">Cover Image</label>
                        <input type="file" className="form-control" accept="image/*"
                            {...register("coverImage", { required: "Cover image is required" })}
                            onChange={handleImageChange}
                            />
                        {errors.coverImage && <small className="text-danger">{errors.coverImage.message}</small>}
                        </div>
                        
                        <div className="col-md-6">

                        {/* Only show preview if image is selected */}
                        {imagePreview && (
                            <img src={imagePreview} alt="Cover Preview" className="img-fluid mt-2 rounded"
                            style={{ maxHeight: '75px', objectFit: 'cover' }}
                            />
                        )}
                        </div>
                    </div>
                    
                    <div className="d-md-flex justify-content-between gap-1">
                        <div className="col-md-6">
                            {/* Stock/Quantity */}
                            <FormInput type="text" label="Quantity" placeholder="Quantity" name="quantity"
                            register={register}
                            rules={{required:"Quantity is reuired", pattern:{value:/^[0-9]+$/, message:'Invalid Pattern'}}}
                            onChange={handleQuantity} error={errors.quantity} />
                        </div>

                        <div className="col-md-6">
                            {/* Language  */}
                            <MultiSelect label="Language" name="language" options={languages} register={register}
                            rules={{ required: "Language is required" }}
                            error={errors.language} />
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button type="button" label="Cancel" color="danger" onClick={() => setIsModalOpen(false)} />
                        <Button type="submit" label="Save" color="success" />
                    </div>
                </form>
            </Modal>
            
            {/* Books Table */}
            <div className="col-12 table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <img className="img-fluid rounded" style={{ width: "48px" }} src={AtomicHabitsImg} alt="Atomic Habits" />
                                    <span>Atomic Habits</span>
                                </div>
                            </td>
                            <td>James Clear</td>
                            <td>
                                <div className="d-flex flex-wrap gap-2">
                                    <Button type="button" color="info" label="View" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BooksTable;