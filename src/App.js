import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const add = (e) => {
    if (e.key === "Enter") {
      setTasks((rest) => [
        ...rest,
        {
          name: e.target.value,
          isChecked: e.target.checked,
        },
      ]);
    }
  };

  //TODO : box de confirmation
  const deleteItem = (index) => {
    let itemsClone = [...tasks];
    itemsClone.splice(index, 1);
    setTasks(itemsClone);
  };

  const checkAll = () => {
    let checkAllTasks = [...tasks];
    if (isAllChecked === false) {
      checkAllTasks.forEach((element) => {
        element.isChecked = true;
      });
      setTasks(checkAllTasks);
      setIsAllChecked(true);
    } else {
      checkAllTasks.forEach((element) => {
        element.isChecked = false;
      });
      setTasks(checkAllTasks);
      setIsAllChecked(false);
    }
  };

  const checked = (index) => (e) => {
    let tempTasks = [...tasks];
    if (tempTasks[index].isChecked === false) {
      tempTasks[index].isChecked = true;
    } else {
      tempTasks[index].isChecked = false;
    }
    setTasks(tempTasks);
  };

  useEffect(() => {
    const storage = localStorage.getItem("task");
    if (storage) {
      setTasks(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <div className="App">
      <h2>TOUDOU APP</h2>
      <input
        className="add-item"
        type="text"
        placeholder="Insert toudou item"
        onKeyPress={add}
      />
      {tasks.map((item, index) => (
        <div className="single-item" key={index}>
          <div>
            <input
              id={index}
              className="single-task"
              type="checkbox"
              checked={item.isChecked}
              onClick={checked(index)}
            />
            <label for={index}>{item.name}</label>
          </div>
          <i className="fas fa-trash-alt" onClick={() => deleteItem(index)}></i>
        </div>
      ))}
      <hr />
      <div className="check-all">
        <label>
          <input type="checkbox" onClick={checkAll} checked={isAllChecked} />
          Check all
        </label>
        <p>
          {tasks.filter((item) => item.isChecked === false).length} items left
        </p>
      </div>

      <hr />
      <div className="buttons">
        <button>All</button>
        <button>Active</button>
        <button>Complete</button>
        <button>Clear Completed</button>
      </div>
    </div>
  );
};

export default App;
