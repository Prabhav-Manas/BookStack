import Card from "../../../../../shared/components/card/Card";
import "./AdminStats.css"

const AdminStats = () => {
    return (
        <div className="row g-3">
            <div className="col-12">
                <h2 className="mb-3">Admin Stats</h2>
            </div>

            <div className="col-12">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                    <div className="col">
                        <Card title="Total Books" count={128} bgClass="bgTotalBookscard" />
                    </div>

                    <div className="col">
                        <Card title="Total Users" count={789} bgClass="bgTotalUsersCard" />
                    </div>

                    <div className="col">
                        <Card title="Processing Orders" count={344} bgClass="bgPendingOrdersCard" />
                    </div>

                    <div className="col">
                        <Card title="Delivered Orders" count={978} bgClass="bgDeliveredOrdersCard" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStats;