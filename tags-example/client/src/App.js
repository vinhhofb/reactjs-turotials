import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function Tags({ initTags = [] }) {
  const [tags, setTags] = useState(initTags);
  const [newTag, setNewTag] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-tags")
      .then((response) => {
        setTags(JSON.parse(response.data.name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addTag = () => {
    const newTags = newTag
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && !tags.includes(tag));
    if (newTags.length > 0 && tags.length + newTags.length <= 10) {
      setTags([...tags, ...newTags]);
    }
    setNewTag("");
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const removeAllTags = () => {
    setTags([]);
  };

  const submitTags = () => {
    setDisabled(true);
    axios
      .post("http://127.0.0.1:8000/api/save-tags", {
        data: JSON.stringify(tags),
      })
      .then((response) => {
        if (response?.data?.status) {
          setDisabled(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="title">
        <h3>Tags</h3>
      </div>
      <div className="details">
        <button onClick={removeAllTags}>Remove All</button>
      </div>
      <div style={{ clear: "both" }}></div>
      <div className="content">
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              {tag}
              <i
                className="fa fa-trash-o"
                onClick={() => removeTag(index)}
              ></i>
            </li>
          ))}
          <input
            type="text"
            spellCheck="false"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
          />
        </ul>
      </div>
      <button className="submit" onClick={submitTags} disabled={disabled}>
        Save
      </button>
    </div>
  );
}

export default Tags;