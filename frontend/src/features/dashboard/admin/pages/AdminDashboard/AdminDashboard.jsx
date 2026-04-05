import AdminStats from "../../components/AdminStats/AdminStats";
import BooksTable from "../../components/BooksTable/BooksTable";
import RecentOrder from "../../components/RecentOrder/RecentOrder";
import AdminDashboardHeroImg from "../../../../../assets/images/admin-hero-image.jpg";
import "./AdminDashboard.css";
import {useGetBooks} from "../../hooks/useGetBooks";
import {useGetTotalUsers} from "../../hooks/useGetTotalUsers";
import Header from "../../../../../shared/components/Header/Header";

const AdminDashboard=()=>{
    const { books, loading, error, getBooks } = useGetBooks();
    const { totalUsers } = useGetTotalUsers();

    return(
        <div className="container">
            <div className="row">
                <div className="col-12 mb-5 position-relative admin-dashboard-hero">
                    <img src={AdminDashboardHeroImg} alt="Admin Hero Image" className="admin-dashboard-hero-img img-fluid" />
                    
                    <div className="admin-dashboard-title position-absolute">
                        <h1 className=" ">Cultivate Your Collection</h1>
                        <p><span>Managing the roots of knowledge to help your community soar.</span></p>
                    </div>
                </div>

                <div className="col-12 mb-5">
                    <AdminStats totalBooks={books.length} totalUsers={totalUsers} />
                </div>

                <div className="col-12 mb-5">
                    <BooksTable books={books} loading={loading} error={error} getBooks={getBooks} />
                </div>

                {/* <div className="col-12">
                    <RecentOrder />
                </div> */}
            </div>
        </div>
    )
}

export default AdminDashboard