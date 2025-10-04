import React from 'react';
import Flashcard from './Flashcard';

function FlashcardList({ results, onReset }) {
  // Parse the results to extract company data
  const parseResults = (data) => {
    // Handle different response formats
    let companies = [];

    // Check if data has a 'result' field (Aria API response format)
    if (data && data.result) {
      const resultText = data.result;

      // Try to parse the result text into company flashcards
      // The result might be structured text that we can parse
      companies = [{
        companyName: 'Analysis Results',
        rawOutput: resultText
      }];

      return companies;
    }

    // If data is a string, try to parse it
    if (typeof data === 'string') {
      try {
        // Try to extract JSON or structured data
        const parsed = JSON.parse(data);
        companies = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // If parsing fails, create a single result with the raw text
        companies = [{
          companyName: 'Analysis Results',
          rawOutput: data
        }];
      }
    } else if (Array.isArray(data)) {
      companies = data;
    } else if (typeof data === 'object' && data !== null) {
      // Check if it's a single company object or wrapped response
      if (data.companies) {
        companies = data.companies;
      } else if (data.results) {
        companies = data.results;
      } else if (data.output) {
        // Try to parse output field
        return parseResults(data.output);
      } else {
        companies = [data];
      }
    }

    return companies;
  };

  const companies = parseResults(results);

  return (
    <div className="flashcard-list-container">
      <div className="flashcard-list-header">
        <h2>Analysis Results ({companies.length} {companies.length === 1 ? 'company' : 'companies'})</h2>
        <button className="reset-button" onClick={onReset}>
          New Analysis
        </button>
      </div>

      <div className="flashcard-list">
        {companies.map((company, index) => (
          <Flashcard key={index} company={company} index={index} />
        ))}
      </div>
    </div>
  );
}

export default FlashcardList;
