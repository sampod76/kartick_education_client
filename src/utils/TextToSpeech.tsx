import React, { useState, useEffect } from "react";

const TextToSpeech: React.FC<{ text: string }> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speakingText, setSpeakingText] = useState<SpeechSynthesisUtterance | null>(
    null
  );

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
   
 

    if (womanVoice) {
      utterance.voice = womanVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    speechSynthesis.cancel(); // Cancel any existing speech
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setSpeakingText(utterance);
  };

  const stopSpeech = () => {
    if (speakingText) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {isPlaying ? (
        <button onClick={stopSpeech}>🔇</button>
      ) : (
        <button onClick={speakText}>🔊</button>
      )}
    </>
  );
};

export default TextToSpeech;