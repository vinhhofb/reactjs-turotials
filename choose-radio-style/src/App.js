import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [themes, setThemes] = useState(['Reactjs', 'Vuejs', 'Angular', 'Nextjs']);
  const [count, setCount] = useState(0);

  const changeTheme = (theme) => {
    if(theme) {
      setCount(themes.indexOf(theme));
    } else if(count < 3) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  }

  useEffect(() => {
    changeTheme(themes[0]);
  }, [])

  return (
    <div className={`body-box ${themes[count]}`}>
      <div className={`card ${themes[count]}-div`}>
        <h1 className="title">{themes[count]}</h1>
        <p className="description">Welcome to {themes[count]}</p>
        <div className="box-choose">
          {themes.map((theme, index) => (
            <button 
              key={index} 
              data-theme={theme}
              className={count === index ? 'button-class-active' : 'button-class'}
              onClick={() => changeTheme(theme)}>
              <div className="title-selected">
                <label>{theme}</label>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
