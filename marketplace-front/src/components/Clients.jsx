import { ClientData } from "../data";
import "../styles/clients.scss";

export default function Clients() {
  return (
    <section className="Clients">
      {ClientData.map((client, index) => {
        return (
          <div className="client" key={index}>
            <img src={client} alt={`client_${index}`} />
          </div>
        );
      })}
    </section>
  );
}
