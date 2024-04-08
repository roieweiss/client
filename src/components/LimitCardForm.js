import React, { useState } from 'react';
import axios from 'axios';


const LimitCardForm = ({ onClose, card}) => {

  const [employmentStatus, setEmploymentStatus] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [requestedLimit, setRequestedLimit] = useState(0);
  const [errorMessage, setErrorMessage] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Start loading
    setErrorMessage(null); // Clear any previous errors
  
    try {
      // Check for empty fields and display an error message
      if (!employmentStatus || !monthlyIncome || !requestedLimit) {
        throw new Error('Please fill all fields.');
      }
  
      // Convert monthly income and requested limit to numbers
      const monthlyIncomeNumber = parseFloat(monthlyIncome);
      const requestedLimitNumber = parseFloat(requestedLimit);
  
      // Make the API request
      const response = await axios.post(
        `http://localhost:5027/api/cards/increase-limit`,
        {
          cardNumber: card,
          employmentStatus,
          monthlyIncome: monthlyIncomeNumber,
          requestedLimit: requestedLimitNumber,
        }
      );
  
      if (response.status === 200) {
        setSuccessMessage(<span style={{ color: 'green' }}>Limit increased successfully!.</span>); // Set success message
        onClose(); // Close the form
      }
    } catch (error) {
      console.error('Error increasing limit:', error);
      setErrorMessage(<span style={{ color: 'red' }}>{error.message}</span>);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  

  return (
    <div className="limit-card-form">
      <h3>Increase Credit Limit</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="employmentStatus">Employment Status:</label>
        <select
          id="employmentStatus"
          value={employmentStatus}
          onChange={(e) => setEmploymentStatus(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Employee">Employee</option>
          <option value="Independent">Independent</option>
        </select>

        <label htmlFor="monthlyIncome">Monthly Income (Must be at least 12,000):</label>
        <input
          type="number"
          id="monthlyIncome"
          value={monthlyIncome}
          min={12000}
          onChange={(e) => setMonthlyIncome(e.target.value)}
        />

<label htmlFor="requestedLimit">Requested Limit:</label>
        <input
          type="number"
          id="requestedLimit"
          value={requestedLimit}
          min={0}
          onChange={(e) => setRequestedLimit(e.target.value)}
        />

        <button type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default LimitCardForm;
