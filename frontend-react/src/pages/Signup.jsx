import { useNavigate, useLocation } from "react-router-dom";
import Input from "../components/UI/Input.jsx";
import api from "../../api.js";
import "../components/authForm.css";

export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSwitchToLogin = () => {
        navigate("/login"); 
    }

    const redirectTo = new URLSearchParams(location.search).get("redirectTo");

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            const response = await api.post("/signup", userData);

            if (!response.ok) {
                throw new Error("Failed to register user");
            }
            navigate(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
        } catch (error) {
            console.log("Error registering user:", error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Ich bin Neukunde</h2>
                <div className="name-box">
                    <Input label="Vorname *" type="text" id="firstname" required />
                    <Input label="Nachname *" type="text" id="lastname" required />
                    <Input label="E-Mail *" type="email" id="email" required />
                    <Input label="Password *" type="password" id="password" minLength="6" required />
                </div>
                <Input label="Straße und Nr.*" type="text" id="street" required />
                <div className="control-row">
                    <Input label="PLZ *" type="text" id="postal" required />
                    <Input label="Ort *" type="text" id="city" required />
                </div>
                <p >
                    <button className="send-button" type="submit">Registrieren</button>
                </p>
                <p className="auth-change">
                    <span>Ich bin bereits Kunde.</span>
                    <button className="link-button" onClick={handleSwitchToLogin}>Login</button>
                </p>
            </form>
        </>
    );
}
