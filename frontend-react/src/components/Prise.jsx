import Family from "../assets/photo-image/EN3A9404.jpg";
import Baby from "../assets/photo-image/EN3A6476.jpg";
import "./Homepage.css"

export default function Prise() {
  return (
    <div className="gallery-box">
      <div className="greet-box">
        <h2>Hey, schön dass ihr hier seid!</h2>
        <p>Ich bin Yu,<br />eure Neugeborenen- und Familienfotografin aus Wörth am Rhein in der Umgebung Südpfalz und Karlsruhe.</p>
        <p>Ich liebe die Fotografie mir all ihren natürlichen, authentischen und individuellen Momenten. Ich bin spezialisiert auf die emotionale, zeitlose Fotografie von Neugeborenen, Kindern und Familien.</p>
        <p>Egal ob draußen in der Natur oder bei euch zu Hause liebe ich eure Momente in eine entspannenden, wohlfühlenden und vertrauten Atmosphäre festzuhalten. Der Moment, an den ihr nach vielen Jahren immer noch schöne Erinnerungen haben werdet, sowohl im Kopf als auch auf den Fotos, ist für die Ewigkeit.</p>
      </div>
      <div className="prise-box">
        <div className="prise-detail">
          <h3>Babyfotografie</h3>
          <h4>Du bekommst</h4>
          <ul>
            <li>Bis zu 2 Studen Shooting</li>
            <li>Auf Wunsch kostenfreie Nutzung unserer Shootingkleider</li>
            <li>Professionelle Bildbearbeitung</li>
            <li>Onlinegalerie zur Sichtung und Auswahl eurer Fotos</li>
            <li>Bilder als digitalen Download und Abzüge</li>
          </ul>
          <p><strong>Kleine Paket: 199€ </strong><span>/ 5 Fotos</span></p>
          <p><strong>Große Paket: 299€ </strong><span>/ alle Fotos</span></p>
        </div>
        <img src={Baby} alt="baby photo" />
      </div>
      <div className="prise-box">
        <img src={Family} alt="family photo" />
        <div className="prise-detail">
          <h3>Familienfotografie / Babybauch</h3>
          <h4>Du bekommst</h4>
          <ul>
            <li>30 - 60 Minuten Shooting</li>
            <li>Professionelle Bildbearbeitung</li>
            <li>Onlinegalerie zur Sichtung und Auswahl eurer Fotos</li>
            <li>Bilder als digitalen Download und Abzüge</li>
          </ul>
          <p><strong>Kleine Paket: 199€ </strong><span>/ 10 Fotos</span></p>
          <p><strong>Große Paket: 299€ </strong><span>/ alle Fotos</span></p>
        </div>
      </div>
    </div>
  );
}