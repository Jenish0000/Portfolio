import React, { useState } from 'react';
import './art.css';
import { Crosshair } from 'lucide-react';

const Art = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      let validQuote = null;

      // Keep fetching until a quote with <= 10 words is found
      while (!validQuote) {
        const res = await fetch('/quote');
        if (!res.ok) throw new Error("Network response was not ok");

        const text = await res.text();
        const data = JSON.parse(text);

        if (data.content.split(' ').length <= 10) {
          validQuote = data;
        }
      }

      setQuote(validQuote.content);
      setAuthor(validQuote.author);
    } catch (error) {
      console.error("Fetch error:", error);
      setQuote("Failed to fetch quote.");
      setAuthor("");
    }
  };

  return (
<div className='parentQuote'>
<div className="quoteContainer">
      {!quote && (
        <div className="quoteButtonContainer" onClick={fetchQuote}>
          <div className="cornerIcons">
            <Crosshair className="icon top-left" />
            <Crosshair className="icon top-right" />
            <Crosshair className="icon bottom-left" />
            <Crosshair className="icon bottom-right" />
            <span className="buttonText">Give me a quote</span>
          </div>
        </div>
      )}

      {quote && (
        <div className="quoteBox">
          <p className="quoteText">"{quote}"</p>
          <p className="quoteAuthor">— {author}</p>
        </div>
      )}
    </div>
</div>
    

  );
};

export default Art;
