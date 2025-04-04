import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchIsAdmin } from "../redux/adminReducer.js";
import { login } from "../redux/authReducer.js";
import Input from "../components/UI/Input.jsx";
import '../components/authForm.css';

export default function Login() {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const albumId = new URLSearchParams(location.search).get("albumId");
    const redirectTo = new URLSearchParams(location.search).get("redirectTo");

    const handleSwitchToSignup = () => {
        const params = new URLSearchParams();
        if (redirectTo) params.append("redirectTo", redirectTo);
        if (albumId) params.append("albumId", albumId);
        navigate(`/signup?${params.toString()}`);
    }

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchIsAdmin()).then((isAdmin) => {
                console.log("fetchIsAdmin response:", isAdmin);
                if (isAdmin) {
                    navigate("/admin/album");
                } else {
                    if (redirectTo === "checkout" && albumId) {
                        navigate(`/shop/${albumId}/checkout`);
                    } else {
                        navigate(redirectTo || "/");
                    }
                }
            }).catch(() => {
                navigate(redirectTo || "/");
            });
        }
    }, [isAuth, dispatch, navigate, albumId, redirectTo]);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            await dispatch(login(userData));
            navigate(redirectTo || "/");
        } catch (error) {
            setLoginError(true);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} id='login-form'>
                <h2>Login</h2>
                <div className='login-box'>
                    <Input label="E-Mail *" type="email" id="email" name="email" required />
                    <Input label="Password *" type="password" id="password" name="password" required />
                </div>
                {loginError && <p className="warn" style={{ color: "rgb(176, 24, 24)" }}>Der Username oder das Passwort ist nicht korrekt.</p>}
                <p >
                    <button className='send-button' type="submit">Login</button>
                </p>
                <p className="auth-change">
                    <span>Ich habe noch keinen Account.</span>
                    <button className="link-button" onClick={handleSwitchToSignup}>registieren</button>
                </p>
            </form>
        </>
    );
}
