import { useState } from "react";
import Input from "../components/UI/Input.jsx";
import api from "../../api.js";
import "../components/form.css";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const contactData = Object.fromEntries(formData.entries());

    try {
      const response = await api.post("/contact", contactData);
      console.log("Response:", response.data);
      alert("Nachricht erfolgreich gesendet!");
      event.target.reset();
    } catch (error) {
      console.error('Error uploading message:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='contact'>
      <form onSubmit={handleSubmit}>
        <h2>Kontakt</h2>
        <div className='contact-box'>
          <Input label="Vorname *" type="text" id="firstname" required />
          <Input label="Nachname *" type="text" id="lastname" required />
          <Input label="E-Mail *" type="text" id="email" required />
          <Input label="Telefon" type="tel" id="phone" />
        </div>
        <div className='message-box'>
          <Input label="Nachricht *" textarea id="message" cols="30" rows="6" />
        </div>
        {loading && <p style={{ marginTop: 10 }}>Ihre Nachricht wird gesendet, bitte warten...</p>}
        <p className='contact-button'>
          <button disabled={loading}>
            {loading ? "wird gesendet..." : "Senden"}
          </button>
        </p>
      </form>
      <div className='bg-box'>
        <div className='contact-content'>
          <div className='content'>
            <h3>Melde Dich!</h3>
            <p>Egal, ob Du bereits ein Familienshooting buchen möchtest, oder, ob Du Dich erstmal informieren willst. Schieb mir einfach!</p>
            <p>Ich freue mich auf deine Nachricht!</p>
          </div>
          <h3 className='contact-name'>Yu Focus Fotografie</h3>
          <div className='contact-address'>
            <p>Max-Ernst-Straße 13</p>
            <p>76744 Wörth</p>
          </div>
          <p>Tel: +49(0)1744770154</p>
          <p>mnyuchen@gmail.com</p>
          <p>www.yu-focus-fotografie</p>
        </div>
      </div>
    </div>
  );
}