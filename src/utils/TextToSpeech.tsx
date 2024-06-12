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
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      speechSynthesis.onvoiceschanged = null; // Clean up event listener
    };
  }, []);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);

    const womanVoice = voices.find((voice) =>
    // console.log(voice)
    
      voice.name.toLowerCase().includes("female")
    );

    if (womanVoice) {
      utterance.voice = womanVoice;
    }

    // console.log(womanVoice);
    

    utterance.onend = () => {
      setIsPlaying(false);
    };

    speechSynthesis.cancel();
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
