// import { Link } from "react-router-native";
import { Link } from "@react-navigation/native";
const Navbar = () => {
    return (
        <header>
            <div className="container" >
                <Link to="/">
                    <h1>SporTogether</h1>
                </Link>
                <nav>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </nav>
            </div>
        </header>

    )
}

export default Navbar;