
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import axios from 'axios';

function App() {
  const dragAreaRef = useRef(null);
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    axios.get('http://127.0.0.1:8000/api/get-items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (dragAreaRef.current) {
      new Sortable(dragAreaRef.current, {
        animation: 350,
        onEnd: function (evt) {
          const newOrder = this.toArray();
          setOrder(newOrder);
          axios.post('http://127.0.0.1:8000/api/update-order', { newOrder: newOrder })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        },
      });
    }
  }, [dragAreaRef]);

  return (
    <div className="container" ref={dragAreaRef}>
      {items.map((item, index) => (
        <div className="item" key={index} data-id={item.id}>
          <div className="image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="name">
            <span>{item.name}</span><br />
            <p>{item.author}</p>
          </div>
          <div className="drag-icon"><i className="fa fa-bars" aria-hidden="true"></i></div>
        </div>
      ))}
    </div>
  );
}

export default App;
