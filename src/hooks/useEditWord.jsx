import { useState } from 'react';

export function useEditWord(initialWord) {
  const [word, setWord] = useState(initialWord);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => setIsEditing(true);
  const finishEditing = (newWord) => {
    setWord(newWord);
    setIsEditing(false);
  };

  return {
    word,
    isEditing,
    startEditing,
    finishEditing,
    setWord,
  };
}
