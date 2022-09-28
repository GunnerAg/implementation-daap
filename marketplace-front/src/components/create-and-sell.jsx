import '../styles/create-and-sell.scss';
import { CreateAndSellData } from '../data';

export default function CreateAndSell(){
  
  return (
    <section className="CreateAndSell">
      <div className="container">
        <div className="title">
          <h2>
            {" "}
            Create & Sell Your
            <i> cool </i> NFT's
          </h2>
        </div>
        <div className="card-container">
          {CreateAndSellData.map(({title, description, buttonText}, index) => {
            return(
              <div className='card' key={index}>
                <h3>{title}</h3>
                <p>{description}</p>

                <a href={buttonText.toLowerCase()}>
                  <button className='button'>{buttonText}</button>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}