import React, { useState } from 'react';

function InputForm({ onSubmit, disabled }) {
  const [industry, setIndustry] = useState('');
  const [clients, setClients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!industry.trim() || !clients.trim()) {
      alert('Please fill in both fields');
      return;
    }

    onSubmit(industry.trim(), clients.trim());
  };

  return (
    <div className="input-form-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g., Technology, Healthcare, Finance"
            disabled={disabled}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="clients">Potential Clients</label>
          <textarea
            id="clients"
            value={clients}
            onChange={(e) => setClients(e.target.value)}
            placeholder="Enter company names, one per line or comma-separated&#10;e.g., Apple, Google, Microsoft"
            rows="6"
            disabled={disabled}
            required
          />
          <small className="form-hint">
            Enter multiple companies separated by commas or new lines
          </small>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={disabled}
        >
          {disabled ? 'Analyzing...' : 'Analyze Companies'}
        </button>
      </form>
    </div>
  );
}

export default InputForm;
