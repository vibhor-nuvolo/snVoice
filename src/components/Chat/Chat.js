import React, { useContext, useState, useEffect } from 'react';
import CallObjectContext from '../../CallObjectContext';
import './Chat.css';
import { translateTranscript ,getLanguage} from '../Tray/client/api';

export default function Chat(props) {
  const callObject = useContext(CallObjectContext);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [tranLatedReceivedText , setTranLatedReceivedText] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    callObject.sendAppMessage({ message: inputValue }, '*');
    const name = callObject.participants().local.user_name
      ? callObject.participants().local.user_name
      : 'Guest';
    setChatHistory([
      ...chatHistory,
      {
        sender: name,
        message: inputValue,
      },
    ]);
    setInputValue('');
  }

  /**
   * Update chat state based on a message received to all participants.
   *
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      const participants = callObject.participants();
      const name = participants[event.fromId].user_name
        ? participants[event.fromId].user_name
        : 'Guest';
      setChatHistory([
        ...chatHistory,
        {
          sender: name,
          message: event.data.message,
        },
      ]);
      // Make other icons light up
      props.notification();
    }

    callObject.on('app-message', handleAppMessage);

    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
    };
  }, [callObject, chatHistory]);

  useEffect(() => {}, [chatHistory]);

function playMessage(message) {
   getLanguage().then((langData) =>{
   var language = langData?.result?.language || "en";
   console.log(langData);
    translateTranscript(message, language).then((data) => {
      console.log('@@vibhor play button chat',data);
      // setTranLatedReceivedText(data.data.result.translated_text);
      var msg = new SpeechSynthesisUtterance();
      msg.text = data.data.result.translated_text;
      window.speechSynthesis.speak(msg);
    });
  });
}


  return props.onClickDisplay ? (
    <div className="chat">
      {chatHistory.map((entry, index) => (
        <div key={`entry-${index}`} className="messageList">
          <b>{entry.sender}</b>: {entry.message}
          <button onClick={()=>playMessage(entry.message)}>
            Play
          </button>
        </div>
        
      ))}
      <form onSubmit={handleSubmit}>
        <label htmlFor="chatInput"></label>
        <input
          id="chatInput"
          className="chat-input"
          type="text"
          placeholder="Type your message here.."
          value={inputValue}
          onChange={handleChange}
        ></input>
        <button type="submit" className="send-chat-button">
          Send
        </button>
      </form>
    </div>
  ) : null;
}
