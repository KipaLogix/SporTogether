
import { useLogout } from '../hooks/useLogout';
// import Navbar from '../components/Navbar';

const Home = () => {
    const { logout } = useLogout();


    const handleClick = () => {
        logout();
    }

    return (
        <div className="home">
            <h2>Home</h2>
            <div>
                <button onClick={handleClick}>Log out</button>
            </div>
        </div>
    )
}

export default Home;