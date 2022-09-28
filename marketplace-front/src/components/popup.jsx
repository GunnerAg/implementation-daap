import { Link } from "react-router-dom";
import "../styles/popup.scss";

export default function Popup({
  type,
  message,
  buttonText,
  onClick,
  redirect,
  redirectUrl,
  redirectText,
}) {
  return (
    <section className="Popup">
      <div className="container">
        <h3>{type}</h3>
        <p>{message}</p>

        {buttonText && (
          <button className="button" onClick={onClick}>
            {buttonText}
          </button>
        )}

        {redirect && (
          <Link className="button" to={redirectUrl}>
            {redirectText}
          </Link>
        )}
      </div>
    </section>
  );
}
