import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/UI/Input";
import api from "../../api.js";
import "../components/shop.css"

export default function Shop() {
  const [albumId, setAlbumId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    
    if (!albumId.trim()) {
      setError("Bitte geben Sie Ihre Code ein");
      return;
    }
    try {
      const response = await api.get(`/albums/${albumId}`);

      if (response.data) {
        navigate(`/shop/${albumId}`);
      } else {
        setError("Code ungültig");
      }
    } catch (error) {
      setError("Code ungültig")
    } finally {
      setLoading(false);
  }};

  return (
    <form onSubmit={handleSubmit}>
      <div id="code-box">
        <div id="input-box">
          <Input
            label="Zugangscode *"
            type="text" id="code"
            value={albumId}
            onChange={(event) => setAlbumId(event.target.value)}
            required />
          <p>
            <button type="submit">Gehen zum Album</button>
          </p>
        </div>
        {loading && <p style={{ marginTop: 10 }}>Es wird geladen...bitte haben Sie noch etwas Geduld</p>}
        <p className="testcode"><strong>Test Code: pvglyf068</strong></p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>Haben Sie einen Zugangscode erhalten? Dann geben Sie diesen bitte hier ein und Sie gelangen direkt zu Ihrem privaten Album.</p>
      </div>
    </form>
  );
}