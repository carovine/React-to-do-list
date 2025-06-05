import React, { useState, useEffect, useContext, useReducer } from 'react';
import './todolist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NameContext } from '../App';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state === 0 ? 1 : 0;
    default:
      return state;
  }
};

const Todolist = () => {
  const [value, setValue] = useState("");
  const [tasklist, setTasklist] = useState(() => {
    const saved = localStorage.getItem('task-list');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Corrupted task-list in localStorage:", e);
      return [];
    }
  });

  const [theme, dispatch] = useReducer(reducer, 0); // 0: light, 1: dark
  const name = useContext(NameContext);

  const inputEnter = (e) => {
    setValue(e.target.value);
  };

  const addTask = () => {
    if (value.trim() === "") return;
    setTasklist([...tasklist, {
      id: tasklist.length,
      task: value,
      status: false
    }]);
    setValue("");
  };

  const taskDelete = (indexToRemove)=>{
    setTasklist((prevTask)=>prevTask.filter(task=>task.id!==indexToRemove));
  }

  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(tasklist));
  }, [tasklist]);

  return (
    <div className={`Container ${theme === 1 ? 'dark' : 'light'}`}>
      <h1>{name}'s To-Do List</h1>

      <label className="switch">
        <input 
          type="checkbox" 
          checked={theme === 1} 
          onChange={() => dispatch({ type: 'TOGGLE' })}
        />
        <span className="slider round"></span>
      </label>

      <div className='header'>
        <input 
          type="text" 
          value={value} 
          onChange={inputEnter} 
          onKeyDown={(e) => e.key === 'Enter' && addTask()} 
        />
        <button onClick={addTask}>Add task</button>
      </div>

      <div className='task-list'>
        {tasklist.map(task => (
          <div className='task-container' key={task.id}>
            <li className='task'>{task.task}</li>
            <div className='icons'>
              <FontAwesomeIcon 
                onClick={() => taskDelete(task.id)} 
                icon={faTrash} 
                style={{ color: "#000000", cursor: "pointer" }} 
              />
              {/* <FontAwesomeIcon 
                icon={faPenToSquare} 
                style={{ color: "#000000", cursor: "pointer" }} 
              /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todolist;
