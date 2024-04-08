import React, {useState} from 'react';
import '../Card.css';
import LimitCardForm from "./LimitCardForm";

const Card = ({ cardNumber, bankName, userName }) => {
    const [showForm, setShowForm] = useState(false);
    console.log('Bank name:', bankName);

    const handleClick = () => {
        // Show the form when the card is clicked
        setShowForm(true);
      };

      const handleCloseForm = () => {
        // Close the form
        setShowForm(false);
      };
      

  return (
    <div className="card" onClick={handleClick} >

      <div className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/he/thumb/f/fa/Isracard_2020_Logo.svg/150px-Isracard_2020_Logo.svg.png" />
      </div>
      <div className="details">
        <p className="card-number">{cardNumber}</p>
        <p className="bank-name">{bankName}</p>
        <p className="user-name">{userName}</p>
      </div>
      {showForm && <LimitCardForm card={cardNumber} onClose={handleCloseForm} />}
    </div>
  );
};

export default Card;
