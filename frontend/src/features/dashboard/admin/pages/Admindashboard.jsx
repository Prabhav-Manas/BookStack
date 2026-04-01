import AdminStats from "../components/AdminStats";
import BooksTable from "../components/BooksTable";
import RecentOrder from "../components/RecentOrder";

const AdminDashboard=()=>{
    return(
        <div className="container">
            <div className="row">
                <h1 className="">Admin Dashboard</h1>

                <div className="col-12">
                    <AdminStats />
                </div>

                <div className="col-12">
                    <BooksTable />
                </div>

                <div className="col-12">
                    <RecentOrder />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard