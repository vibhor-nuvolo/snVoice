import React, { useEffect, useCallback, useState } from 'react';
import './SNVoice.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { SayButton } from 'react-say';
import { translateTranscript } from './client/api';

const SNVoice = () => {
  const { transcript, resetTranscript} = useSpeechRecognition();
  const [title, setTitle] = useState('');
  const [translatedText,setTranslatedText] = useState('');

  const startListen = useCallback((event) => {
    if (event.keyCode === 32) {
      SpeechRecognition.startListening({ continuous: true });
      setTitle('Listening...');
    }
  }, []);
  const stopListen = useCallback((event) => {
    if (event.keyCode === 32) {
      SpeechRecognition.stopListening();
      setTitle('');
    }
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', startListen, false);
    document.addEventListener('keyup', stopListen, false);

    return () => {
      document.removeEventListener('keydown', startListen, false);
      document.addEventListener('keyup', stopListen, false);
    };
  }, [startListen, stopListen]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const callApi = () => {
    translateTranscript(transcript, 'fr').then((data) => {
      console.log(data);
      alert(data.data.result.translated_text);
      setTranslatedText(data.data.result.translated_text);
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      {title}
      <button style={{ marginRight: 10 }} onClick={() => resetTranscript()}>
        Reset
      </button>
      <button onClick={callApi}>Translate</button>
      {translatedText && <SayButton
        onClick={(event) => callApi}
        speak={translatedText}
      >
       Click to send
      </SayButton>}
      <div style={{ marginLeft: 10, backgroundColor: 'grey' }}>
        <p style={{ color: 'white' }}>{transcript}</p>
      </div>
    </div>
  );
};
export default SNVoice;
