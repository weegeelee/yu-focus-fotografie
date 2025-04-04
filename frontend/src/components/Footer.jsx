import { Link } from "react-router-dom"
import "./footer.css"

export default function Footer() {
    return (
        <footer id="footer">
            <div id="footer-impressum">
                <Link to="/impressum"><span>Impressum</span></Link>
                <Link to="/datenschutz"><span>Datenschutz</span></Link>
                <p>© 2023  Yu Focus Fotografie</p>
            </div>
            <p id="place">
                Neugeborenenfotografie | Neugeborenenfotoshooting | Familienfotoshooting | Kinderfotografie | Babybauchfotografie | Babybauchshooting | Wörth am Rhein | Karlsruhe | Südpfalz | Landau | Rheinland-Pfalz | Ettlingen | Rheinstetten | Linkenheim-Hochstetten | Eggenstein-Leopoldshafen |
            </p>
        </footer>
    );
}