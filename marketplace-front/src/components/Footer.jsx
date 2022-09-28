import { companyLinks, contactInfo, servicesLinks, socialIcons } from "../data";
import '../styles/footer.scss';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="row">
        <p className="description">1920 Hampshire, Winchester</p>
        <div className="social-icons">
          {socialIcons.map((icon, index) => {
            return (
              <div className="icon" key={index}>
                {icon}
              </div>
            );
          })}
        </div>
      </div>
      <div className="row">
        <h3>Our Services</h3>
        <ul className="lits">
          {servicesLinks.map((link, index) => {
            return <li key={index}>{link}</li>;
          })}
        </ul>
      </div>
      <div className="row">
        <h3>Company</h3>
        <ul className="list">
          {companyLinks.map((link, index) => {
            return <li key={index}>{link}</li>;
          })}
        </ul>
      </div>
      <div className="row">
        <h3>Contact us</h3>
        <ul className="list">
          {contactInfo.map(({ icon, value }, index) => {
            return (
              <li key={index}>
                <div className="icon">{icon}</div>
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
