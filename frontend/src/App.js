import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import FlashcardList from './components/FlashcardList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleSubmit = async (industry, clients) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post('/run-agent', {
        industry,
        clients
      });

      if (response.data.success) {
        setResults(response.data.data);
      } else {
        setError('Failed to get results from the agent');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'An error occurred while processing your request'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 PRISM Intelligence Dashboard</h1>
        <p>Analyze potential clients and get market insights</p>
      </header>

      <main className="app-main">
        <InputForm onSubmit={handleSubmit} disabled={loading} />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

        {results && (
          <FlashcardList
            results={results}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by Aria AI</p>
      </footer>
    </div>
  );
}

export default App;
