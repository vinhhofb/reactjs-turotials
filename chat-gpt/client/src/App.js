import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Chatbox = () => {
  const [chatColor, setChatColor] = useState('#0084ff');
  const [colorPanelShown, setColorPanelShown] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [tutorialSeen, setTutorialSeen] = useState(false);
  const [messages, setMessages] = useState([]);

  const colors = [
    '#0084ff', '#ffc300', '#4af844',
    '#7646ff', '#a695c7', '#ff5ca1',
    '#fa3c4c', '#f56b78', '#33343f'
  ];

  const send = () => {
    axios.post('http://192.168.1.8:8000/api/send', { message: newMessage })
      .then(response => {
        const lastId = messages[messages.length - 1]?.id || 1;
        setMessages(prevMessages => [...prevMessages, { id: lastId + 1, text: response?.data, primary: false }]);
      })
      .catch(error => {
        console.error(error);
      });

    const lastId = messages[messages.length - 1]?.id || 1;
    setMessages(prevMessages => [...prevMessages, { id: lastId + 1, text: newMessage, primary: true }]);
    setTutorialSeen(true);
    setNewMessage('');
  };

  const setColor = (color) => {
    setChatColor(color);
    setColorPanelShown(false);
  };

  return (
    <div className="chatbox" id="app">
      <div className="colorPanel" style={{ display: colorPanelShown ? 'flex' : 'none', opacity: colorPanelShown ? 'flex' : 'none' }}>
        {colors.map(color => (
          <div className="colorPanel__colorSlot" key={color}>
            <div className="colorPanel__color" style={{ background: color }} onClick={() => setColor(color)}></div>
          </div>
        ))}
      </div>
      <div className="chatbox__header">
        <div className="chatbox__headerText">
          HHV Technology
          <div className="chatbox__onlineDot"></div>
        </div>
        <div className="chatbox__button" onClick={() => setColorPanelShown(!colorPanelShown)}></div>
      </div>
      <div className="chatbox__messages">
        {messages.map(message => (
          <div className={`chatbox__messageBox ${message.primary ? 'chatbox__messageBox--primary' : ''}`} key={message.id}>
            <div className={`chatbox__message ${message.primary ? 'chatbox__message--primary' : ''}`} style={{ background: message.primary ? chatColor : '#f1f1f1' }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chatbox__inputPanel">
        <input className="chatbox__input" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyUp={e => e.key === 'Enter' && send()} placeholder="Aa" />
        <div className="chatbox__tooltip chatbox__tooltip--bottom" style={{ opacity: newMessage.length > 2 && !tutorialSeen ? 0.7 : 0 }}>
          Press enter to send the message
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
