import React, { useState, useEffect } from "react";

const TextToSpeech: React.FC<{ text: string }> = ({ text }) => {
  const [play, setPlay] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if ('speechSynthesis' in window) {
      loadVoices();
      // Chrome loads voices asynchronously, so listen for voiceschanged event
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    // Filter voices to get a woman's voice
    const womanVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes("female")
    );
    console.log("🚀 ~ speakText ~ voices:", voices)
 

    if (womanVoice) {
      utterance.voice = womanVoice;
    }

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
