import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "./Card";
import '../App.css'

const SearchPage = () => {
    const [isBlock, setIsBlock] = useState(null);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [cardsData, setCardsData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [newTabOpened, setNewTabOpened] = useState(false);
    const [bankNames, setBankNames] = useState([]);
    const [banks, setBanks] = useState([]);

    // Fetching card data on component mount
    useEffect(() => {
        const fetchCardsData = async () => {
            try {
                const response = await axios.get('http://localhost:5027/api/cards');
                setCardsData(response.data);
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        };
        fetchCardsData();
        fetchBanks();
    }, []);

    // Fetch bank names when search category is 'bank_name'
    useEffect(() => {
        const fetchBankNames = async () => {
            try {
                const response = await axios.get('http://localhost:5027/api/banks/names');
                setBankNames(response.data.map(bank => bank.Name)); // Extracting bank names
            } catch (error) {
                console.error('Error fetching bank names:', error);
            }
        };

        if (searchCategory === 'bank_name') {
            fetchBankNames();
        } else {
            setBankNames([]);
        }
    }, [searchCategory]);


    const handleSearchCategoryChange = (category) => {
        setSearchCategory(category);
        setSearchValue(''); // Clear search value when category changes
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = async () => {
        try {
            let filteredItems = cardsData;

            // Apply filter based on search category
            if (searchCategory === 'card_number') {
                filteredItems = filteredItems.filter(card => card.cardNumber.toString().includes(searchValue));
            } else if (searchCategory === 'bank_name') {
                const response = await axios.get(`http://localhost:5027/api/banks/search`);
                filteredItems = response.data;
            }

            // Apply filter based on isBlock
            if (isBlock !== null) {
                const isBlocked = isBlock === 'true'; // Convert string to boolean
                filteredItems = filteredItems.filter(card => card.isBlocked === isBlocked);
            }

            setSearchResults(filteredItems);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const openNewTab = () => {
        setNewTabOpened(true);
    };
    const fetchBanks = async () => {
        try {
          const response = await axios.get('http://localhost:5027/api/banks');
          setBanks(response.data);
        } catch (error) {
          console.error('Error fetching banks:', error);
        }
      };


      const formatCardNumber = (cardNumber) => {
        const firstFourDigits = cardNumber.slice(0, 4);
        const middleAsterisks = '*'.repeat(cardNumber.length - 8); // Length of card number minus first 4 and last 4 digits
        const lastFourDigits = cardNumber.slice(-4);
        return firstFourDigits + middleAsterisks + lastFourDigits;
      };

    return (
        <div>
            <h1>Search</h1>
            <button onClick={openNewTab} disabled={newTabOpened}>Search for a card</button>
            <div style={{ display: newTabOpened ? 'block' : 'none' }}>
                <div>
                    <label>
                        Is blocked:
                        <input
                            type="radio"
                            value="true"
                            checked={isBlock === 'true'}
                            onChange={(e) => setIsBlock(e.target.value)}
                        />
                        True
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="false"
                            checked={isBlock === 'false'}
                            onChange={(e) => setIsBlock(e.target.value)}
                        />
                        False
                    </label>
                </div>
                <div>
                    <select value={searchCategory} onChange={(e) => handleSearchCategoryChange(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="card_number">Card Number</option>
                        <option value="bank_name">Bank Name</option>
                    </select>
                    {searchCategory === 'bank_name' && (
                        <select value={searchValue} onChange={handleInputChange}>
                            <option value="">Select a bank</option>
                            <option value="Bank Hapoalim">Bank Hapoalim</option>
                            <option value="Bank Leumi">Bank Leumi</option>
                            <option value="Bank Mizrahi-Tefahot">Bank Mizrahi-Tefahot</option>
                            <option value="Bank Discount">Bank Discount</option>
                            <option value="Israel Discount Bank">Israel Discount Bank</option>
                            <option value="Bank Otsar Ha-Hayal">Bank Otsar Ha-Hayal</option>
                            <option value="Bank Mercantile Discount">Bank Mercantile Discount</option>
                            <option value="Bank Massad">Bank Massad</option>
                            <option value="Union Bank of Israel">Union Bank of Israel</option>
                            {bankNames.map((bank, index) => (
                                <option key={index} value={bank}>{bank}</option>
                            ))}
                        </select>
                    )}
                    {searchCategory === 'card_number' && (
                        <input type="text" value={searchValue} onChange={handleInputChange} />
                    )}
                    <button onClick={handleSearch}>Search</button>
                    <div>
                        <h2>Search Results</h2>
                        <div className="card-row">
                            {searchResults.map((card, index) => (
                                <Card
                                    key={index}
                                    cardNumber={formatCardNumber(card.cardNumber.toString())}
                                    bankName={banks.find(bank => bank.bankCode === card.bankCode)?.bank.Name}
                                    userName={card.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
