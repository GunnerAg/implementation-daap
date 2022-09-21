import Clients from "../components/Clients";
import CreateAndSell from "../components/CreateAndSell";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <CreateAndSell />
      <Clients />
      <Footer />
    </div>
  );
}
