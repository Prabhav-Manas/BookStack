import AtomicHabitsImg from "../../../../../assets/images/Atomic-Habits.jpg";
import Card from "../../../../../shared/components/card/Card";

const RecentOrder = () => {
    return(
        <div className="row">
            <div className="col-12 mb-3">
                <h2>Recent Order</h2>
            </div>

            <div className="col-12 col-sm-6 col-md-3 col-lg-6">
                <Card
                    srcImg={AtomicHabitsImg}
                    title="Atomic Habits"
                    author="James Clear"
                    btnType="button"
                    btnColor="info"
                    btnLable="View Details"
                    className="h-50"
                    style={{ maxWidth: '320px', minHeight: '100%' }}
                />
            </div>
        </div>
    )
}

export default RecentOrder