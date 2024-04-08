import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../App.css'



const CardList = () => {
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);
  const [showList, setShowList] = useState(false);
  
  

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get('http://localhost:5027/api/banks');
      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5027/api/cards');
      setCards(response.data);
      setShowList(true);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
 
// add a big bug in the program and no time
  const formatCardNumber = (cardNumber) => {
    const firstFourDigits = cardNumber.slice(0, 4);
    const middleAsterisks = '*'.repeat(cardNumber.length - 8); // Length of card number minus first 4 and last 4 digits
    const lastFourDigits = cardNumber.slice(-4);
    return firstFourDigits + middleAsterisks + lastFourDigits;
  };

  return (
    <div>
      <h1 style={{ color: 'black' }}>Card List</h1>
      <button onClick={fetchCards}>Fetch Cards</button>
      {showList && (
        <div className="card-container">
          {cards.map((card, index) => (
            <Card 
              key={index}
              cardNumber={(card.cardNumber.toString())}
              bankName={banks.find(bank => bank.bankCode === card.bankCode)?.name}
              userName={card.name}
            />
          ))}
        </div>
        
      )}
    </div>
  );
};

export default CardList;
