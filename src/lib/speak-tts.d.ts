declare module 'speak-tts' {
    export type TOptions = {
      volume?: number;
      lang?: string;
      rate?: number;
      pitch?: number;
      voice?: string;
      splitSentences?: boolean;
    };
  
    export type TSpeak = (options: TOptions) => void;
    export type TCancel = () => void;
    export type TStop = () => void;
    export type TInit = (options: TOptions) => void;
  
    export const speak: TSpeak;
    export const cancel: TCancel;
    export const stop: TStop;
    export const init: TInit;
  }
  