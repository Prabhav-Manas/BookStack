import Button from "../../../../../shared/components/Button/Button";
import "./BooksTable.css";
import AtomicHabitsImg from "../../../../../assets/images/Atomic-Habits.jpg";
import TheAlchemistImg from "../../../../../assets/images/The-Alchemist.jpg";
import RichDadPoorDadImg from "../../../../../assets/images/Rich-Dad-Poor-dad.jpg";
import { useNavigate } from "react-router-dom";

const BooksTable = () => {
    const navigate=useNavigate();

    const onViewAllBooks=()=>{
        navigate('/admin/bookList');
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
                }/>
            </div>

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
                                    {/* <Button type="button" color="primary" label="Edit" />
                                    <Button type="button" color="danger" label="Delete" /> */}
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <img className="img-fluid rounded" style={{ width: "48px" }} src={TheAlchemistImg} alt="The Alchemist" />
                                    <span>The Alchemist</span>
                                </div>
                            </td>
                            <td>Paulo Coelho</td>
                            <td>
                                <div className="d-flex flex-wrap gap-2">
                                    <Button type="button" color="info" label="View" />
                                    {/* <Button type="button" color="primary" label="Edit" />
                                    <Button type="button" color="danger" label="Delete" /> */}
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="d-flex align-items-center gap-2">
                                    <img className="img-fluid rounded" style={{ width: "48px" }} src={RichDadPoorDadImg} alt="Rich Dad Poor Dad" />
                                    <span>Rich Dad Poor Dad</span>
                                </div>
                            </td>
                            <td>Robert T. Kiyosaki</td>
                            <td>
                                <div className="d-flex flex-wrap gap-2">
                                    <Button type="button" color="info" label="View" />
                                    {/* <Button type="button" color="primary" label="Edit" />
                                    <Button type="button" color="danger" label="Delete" /> */}
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