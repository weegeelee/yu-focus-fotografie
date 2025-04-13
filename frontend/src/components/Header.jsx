import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authReducer.js";
import { setAdminStatus, fetchIsAdmin } from "../redux/adminReducer";
import { SelectedPhotosContext } from "../components/store/PhotoContext.jsx";
import { CartContext } from "./store/CartContext.jsx";
import logoImg from "../assets/yufocus-logo.png";
import "./Header.css";

export default function Header() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAuth = useSelector(state => state.auth.isAuth);
    const isAdmin = useSelector(state => state.admin.isAdmin);
    const username = useSelector((state) => state.auth.firstname);
    const { albumId } = useContext(SelectedPhotosContext);
    const { cart, clearCart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);

    const isShopPage = location.pathname.startsWith("/shop");

    useEffect(() => {
        const storedIsAdmin = JSON.parse(localStorage.getItem("isAdmin"));
        if (storedIsAdmin !== null) {
            dispatch(setAdminStatus(storedIsAdmin));
        }
        dispatch(fetchIsAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("open");
        } else {
            document.body.classList.remove("open");
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };

    const getLoginLink = () => {
        const isShopPage = /^\/shop\/[^/]+(\/cart)?$/.test(pathname);
        return isShopPage
            ? `/login?redirectTo=${encodeURIComponent(pathname)}`
            : '/login';
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setAdminStatus(false));
        clearCart(); 
        navigate("/login");
    };

    return (<header id={isOpen ? "main-header-open" : "main-header"}>
        <NavLink to="/" active="active" end><img src={logoImg} className="header-img" alt="Yu Focus Fotografie logo" /></NavLink>
        <nav className={isOpen ? "mobile-drawer open" : "nav"}>
            {isAuth && isAdmin ? (
                <>
                    <NavLink to="/admin/album" onClick={closeMenu}>Album</NavLink>
                    <NavLink to="/admin/customer" onClick={closeMenu}>Kunden</NavLink>
                    <NavLink to="/admin/contact" onClick={closeMenu}>Nachricht</NavLink>
                    <button onClick={handleLogout} className="nav-button">Logout</button>
                </>
            ) : isShopPage ? (
                <>
                    <NavLink to={`/shop/${albumId}/cart`}>Warenkorb ({cart.length})</NavLink>
                    {isAuth ? (
                        <button onClick={handleLogout} className="nav-button">{username}, Logout</button>
                    ) : (
                        <NavLink to={getLoginLink()} onClick={closeMenu}>Login</NavLink>
                    )}
                </>
            ) : isAuth ? (
                <>
                    <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                    <NavLink to="/contact" onClick={closeMenu}>Kontakt</NavLink>
                    <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
                    <NavLink to="/order" onClick={closeMenu}>Bestellung</NavLink>
                    <button onClick={handleLogout} className="nav-button">{username}, Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                    <NavLink to="/contact" onClick={closeMenu}>Kontakt</NavLink>
                    <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
                    <NavLink to="/login" onClick={closeMenu}>Login | Admin</NavLink>
                </>
            )}
        </nav>
        <button id="drawer-btn" onClick={toggleMenu} className={isOpen ? "open" : ""}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    </header >)
}
