import React, { useState } from 'react';

function Flashcard({ company, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Extract company information with fallbacks
  const companyName = company.companyName || company.name || company.company || `Company ${index + 1}`;

  // Check if flashcards array exists (new Aria format)
  const flashcards = company.flashcards || [];

  // Extract data from flashcards array or use fallback fields
  const fundingCard = flashcards.find(f => f.type === 'Funding');
  const productCard = flashcards.find(f => f.type === 'Product');
  const hiringCard = flashcards.find(f => f.type === 'Hiring');
  const riskCard = flashcards.find(f => f.type === 'Risk');
  const competitorCard = flashcards.find(f => f.type === 'Competitors');
  const sentimentCard = flashcards.find(f => f.type === 'Sentiment');

  const fundingUpdates = fundingCard?.content || company.fundingUpdates || company.funding || 'No funding updates available';
  const productUpdates = productCard?.content || company.productUpdates || company.products || company.product || 'No product updates available';
  const hiringUpdates = hiringCard?.content || company.hiringUpdates || company.hiring || 'No hiring updates available';
  const risks = riskCard?.content || company.risks || company.risk || 'No risks identified';
  const competitorHighlights = competitorCard?.content || company.competitorHighlights || company.competitors || company.competition || 'No competitor information available';
  const marketSentiment = sentimentCard?.content || company.marketSentiment || company.sentiment || company.market || 'No market sentiment data available';
  const rawOutput = company.rawOutput || '';

  return (
    <div className={`flashcard ${isExpanded ? 'expanded' : ''}`}>
      <div className="flashcard-header" onClick={toggleExpand}>
        <h3>{companyName}</h3>
        <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
      </div>

      {isExpanded && (
        <div className="flashcard-content">
          {rawOutput ? (
            <div className="flashcard-section">
              <h4>Analysis Output</h4>
              <pre className="raw-output">{rawOutput}</pre>
            </div>
          ) : (
            <>
              <div className="flashcard-section">
                <h4>💰 Funding Updates</h4>
                <p>{fundingUpdates}</p>
              </div>

              <div className="flashcard-section">
                <h4>🚀 Product Updates</h4>
                <p>{productUpdates}</p>
              </div>

              <div className="flashcard-section">
                <h4>👥 Hiring Updates</h4>
                <p>{hiringUpdates}</p>
              </div>

              <div className="flashcard-section">
                <h4>⚠️ Risks</h4>
                <p>{risks}</p>
              </div>

              <div className="flashcard-section">
                <h4>🏆 Competitor Highlights</h4>
                <p>{competitorHighlights}</p>
              </div>

              <div className="flashcard-section">
                <h4>📈 Market Sentiment</h4>
                <p>{marketSentiment}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Flashcard;
