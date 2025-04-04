import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Instagram from "../assets/icon/instagram.png";
import Facebook from "../assets/icon/facebook.png";
import './homepage.css';

const faqData = [
  { id: 1, question: "Wann ist die beste Zeit für ein Neugeborenen-Shooting?", answer: "Das Neugeborenen-shooting findet idealerweise in den ersten 14 Tagen statt. Nach dem 14. Lebenstag kann das Shooting etwa anstrengender und auch länger sein, weil die Babys sich da schon länger wachhalten können. Jedoch ist es zu jeder Zeit möglich, wundervolle Erinnerungen von deinem kleinen Wunder zu schaffen." },
  { id: 2, question: "Wann ist die beste Zeit für ein Babybauch-Shooting?", answer: "Die beste Zeit in der dein Babybauch schön rund und kugelig ist liegt zwischen der 30. und 36. SSW. Danach kann es eng werden, falls dein Baby früher kommen mag. Außerdem wird es zum Ende der Schwangerschaft oft etwas beschwerlicher." },
  { id: 3, question: "Wo findet das Shooting statt?", answer: "Ich bin für alles offen. Ich liebe sowohl Familienreportagen bei Euch zu Hause als auch Outdoor Aktivitäten & Locations. Bei dem Neugeborenen-shooting findet es im Studio oder bei dir zu Hause(auf Wunsch) Statt." },
  { id: 4, question: "Was sollen wir auf Familienfotos anziehen?", answer: "Kleidung ist am schönsten und zeitlos auf Bildern, wenn sie ohne Aufdruck oder Aufschrift, einfarbig oder nur dezent gemustert ist. Bei Familien- und Geschwisterfotos ist es schön, wenn die Kleidung in der selben Farbfamilie ist, beispielsweise Pastelltöne, hell- und dunkelblau, alles in Herbsttönen usw!" },
  { id: 5, question: "Wie viele Personen dürfen zum Shooting mitkommen?", answer: "Die Personen, die mit auf die Bilder sollen, können mitkommen. Ob wir Bilder Eurer Kernfamilie, hauptsächlich Kinderfotos oder Großfamilienbilder machen sollen, ganz egal, es gibt keinen Aufpreis für mehrere Personen." },
  { id: 6, question: "Kann ich das Shooting verschieben bei Regen oder Krankheit?", answer: "Kein Problem, wir suchen gemeinsam einen neuen Termin. Damit wir auch die schönsten Momente für dich und deine Familie festhalten können, sollt ihr euch natürlich auch wohlfühlen." },
  { id: 7, question: "Stellst du auch Kleider zur Verfügung?", answer: "Für die Klitzekleinen habe ich einen kleinen Kundenkleiderschrank, gerne kannst du dir für das Shooting leihen. " },
  { id: 8, question: "Wann soll ich bezahlen?", answer: "Ich benötige 25% des Paketpreises vor dem Shooting als Anzahlung. Der Restbetrag wird fällig, nachdem ich dich die Online Galerie zur Durchsicht bereit gestellt habe. Sobald der Restbetrag bei mir eingegangen ist, schalte ich die Galerie frei und du hast freien Zugriff auf deine Fotos." },
  { id: 9, question: "Wie und wann bekomme ich meine Bilder?", answer: "Die Bearbeitung deiner Bilder dauert maximal 4 Wochen. Eine ganz aktuelle Einschätzung gebe ich dich beim Shooting. Sobald du einen Link zu deiner Auswahl-Galerie bekommen hast, entscheidest dich in Ruhe für dein Wunschpaket. Anschließend erhältst du deine Lieblingsbilder digital zum Download." },
  { id: 10, question: "Werden die Bilder veröffentlicht?", answer: "Ohne Euer Einverständnis auf jeden Fall nicht! Am Tag des Shootings füllen wir vorher einen Vertrag aus. Ihr habt hier die Möglichkeit, auszuwählen ob ich die Bilder veröffentlichen darf oder nicht. Für die Veröffentlichung gibt es einen kleinen Rabatt. " },
];

export default function FAQPage() {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-box">
      <h1>Häufige Fragen rund um dein Fotoshooting</h1>
      <div>
        {faqData.map((faq) => (
          <div key={faq.id} className="question">
            <button onClick={() => toggleFAQ(faq.id)}>
              {faq.question}
              <span>{activeId === faq.id ? "-" : "+"}</span>
            </button>
            <AnimatePresence>
              {activeId === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="answer">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="contact-btn">
        <div className="contact-left">
          <a href="https://www.instagram.com/yu_focus_fotografie/" target="_blank" rel="">
            <img src={Instagram} alt="Instagram" />
          </a>
        </div>
        <div className="contact-middle">
          <h4>Kontakt</h4>
          <p>Du willst auch gerne solche wunderbaren Erinnerungen an deine Familiengeschichte?</p>
          <Link to="/contact"><button>jetzt anfragen</button></Link>
        </div>
        <div className="contact-right">
          <a href="https://www.facebook.com/" target="_blank" rel="">
            <img src={Facebook} alt="Facebook" />
          </a>
        </div>
      </div>
    </div>
  );
}
