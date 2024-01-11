import React, { useState } from "react";

const TextToSpeech: React.FC<{ text: string }> = ({ text }) => {
  const [play, setPlay] = useState(false);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setPlay(false);
    };

    speechSynthesis.speak(utterance);
    setPlay(true);
  };

  return (
    <>
      {play ? (
        <button onClick={speakText}>🔊</button>
      ) : (
        <button onClick={speakText}>🔉</button>
      )}
    </>
  );
};

export default TextToSpeech;
