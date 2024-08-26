import React, { useState, useEffect, useRef } from 'react';

function Word({ data, highlighted, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [word, setWord] = useState(data.word);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = '2.2rem Arial';
      const textWidth = context.measureText(word).width;
      inputRef.current.style.width = `${textWidth + 10}px`;

      // Focus the input on mobile devices
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(word.length, word.length); // Move cursor to end
      }, 0);
    }
  }, [word, isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTouchStart = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (word.trim() !== '') {
      onEdit(word); 
    } else {
      setWord(data.word);
    }
  };

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur(); // Commit changes on Enter
    }
    if (e.key === 'Escape') {
      setWord(data.word); // Revert changes on Escape
      setIsEditing(false);
    }
  };

  return (
    <span
      className={`word-item cursor-pointer ${highlighted ? 'highlighted' : ''}`}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart} // Handle touch events for mobile
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          className="word-input"
          type="text"
          value={word}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ width: 'auto', padding: '0 5px', fontSize: '2.2rem', fontFamily: 'Arial' }}
        />
      ) : (
        <span className={`text ${highlighted ? 'bg-yellow-400 text-black' : 'text-white'}`}>
          {word}
        </span>
      )}
    </span>
  );
}

export default Word;
