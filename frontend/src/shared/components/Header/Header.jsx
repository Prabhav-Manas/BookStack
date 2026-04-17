import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../../context/AuthContext";

const Header=()=>{
    const navigate=useNavigate();
    const { logout, user } = useAuth();

    const onViewBooks=()=>{
        navigate('/admin/bookList')
    }



    const onSignOut=()=>{
        logout(); // clears everything centrally
        navigate('/');
    }

    return(
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bgHeaderColor">
                <div className="container-fluid">

                    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand text-white" href="#">Admin Dashboard</a>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item" style={{cursor:'pointer'}}>
                                <a className="nav-link active text-white" aria-current="page" onClick={onViewBooks} >Books</a>
                            </li>

                            {/* Show logged in user's name */}
                            <li className="nav-item">
                                <span className="nav-link text-white">
                                    <i className="fa fa-user" aria-hidden="true"></i> {user?.fullname}
                                </span>
                            </li>

                            <li className="nav-item" style={{cursor:"pointer"}}>
                                <a className="nav-link text-white" onClick={()=>navigate("/user/cart")}><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
                            </li>

                            <li className="nav-item" style={{cursor:'pointer'}} onClick={onSignOut}>
                                <a className="nav-link disabled text-white" aria-disabled="true">Sign out</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;