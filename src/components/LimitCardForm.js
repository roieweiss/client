import React, { useState } from 'react';
import axios from 'axios';

const LimitCardForm = ({ onClose, card }) => {
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [requestedLimit, setRequestedLimit] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(null); // Clear any previous errors

    // Check for empty fields and display an error message
    if (!employmentStatus || !monthlyIncome || !requestedLimit) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        `http://localhost:5027/api/cards/increase-limit`,
        {
          employmentStatus,
          monthlyIncome,
          requestedLimit,
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Limit increased successfully!'); // Set success message
        onClose(); // Close the form
      } else {
        console.error('Error increasing limit:', response.data);
        setErrorMessage('An error occurred while increasing the limit. Please try again later.');
      }
    } catch (error) {
      console.error('Error increasing limit:', error);
      setErrorMessage('An error occurred while increasing the limit. Please try again later.');
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
          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
        />

        <label htmlFor="requestedLimit">Requested Limit:</label>
        <input
          type="number"
          id="requestedLimit"
          value={requestedLimit}
          min={0}
          onChange={(e) => setRequestedLimit(Number(e.target.value))}
        />

        <button type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default LimitCardForm;
