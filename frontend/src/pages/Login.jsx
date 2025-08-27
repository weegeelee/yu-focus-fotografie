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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
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
        setLoginError(false);       // Reset errors before each submission
        setLoading(true);

        try {
            await dispatch(login({ email, password }));
            navigate(redirectTo || "/");
        } catch (error) {
            setLoginError(true);
        } finally {
            setLoading(false);
        }
    }

    async function handleVisitorLogin() {
        const visitorEmail = "besucher@gmail.com";
        const visitorPassword = "123456"; 
    
        setEmail(visitorEmail);
        setPassword(visitorPassword);
    
        setLoginError(false);
        setLoading(true);
        try {
          await dispatch(login({ email: visitorEmail, password: visitorPassword }));
          navigate(redirectTo);
        } catch (error) {
          setLoginError(true);
        } finally {
          setLoading(false);
        }
      }

    return (
        <>
            <form onSubmit={handleSubmit} id='login-form'>
                <h2>Login</h2>
                <div className='login-box'>
                    <Input label="E-Mail *" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input label="Password *" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {loginError && <p className="warn" style={{ color: "rgb(176, 24, 24)" }}>Der Username oder das Passwort ist nicht korrekt.</p>}
                {loading && <p style={{ marginTop: 10 }}>Es wird bearbeitet, bitte warten...</p>}
                <p >
                    <button className='send-button' type="submit" disabled={loading}>
                        { loading ? "Login läuft..." : "Login"}
                    </button>
                </p>
                <p >
                //    <button className='send-button' type="button" onClick={handleVisitorLogin} disabled={loading}>Admin Login als Besucher</button>
                </p>
                <p className="auth-change">
                    <span>Ich habe noch keinen Account.</span>
                    <button className="link-button" onClick={handleSwitchToSignup}>registieren</button>
                </p>
            </form>
        </>
    );
}
