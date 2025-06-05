import React, { useState, useEffect,useContext} from 'react'
import './todolist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NameContext } from '../App';

const Todolist = () => {
  const [value,setValue] = useState("");
  const [tasklist,setTasklist] = useState(() => {
  const saved = localStorage.getItem('task-list');
  try {
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Corrupted task-list in localStorage:", e);
    return [];
  }
});

  const inputEnter = (e)=>{
    setValue(e.target.value);
  }

  const addTask = ()=>{
    setTasklist([...tasklist,{
      id: tasklist.length,
      task: value
    }])
    setValue("");
  }

  const name = useContext(NameContext);

  // useEffect(
  //   ()=>{
  //     const storedTask = JSON.parse(localStorage.getItem('task-list'));
  //     console.log(storedTask)
  //     if (storedTask){
  //       setTasklist(storedTask)
  //     }
  //   }
  //   ,[])

  
  useEffect(()=>{
    localStorage.setItem("task-list",JSON.stringify(tasklist));
  },[tasklist])


  return (
    <div className='Container'>
      <h1>{name}'s To-Do List</h1>
      <div className='header'> 
        <input type="text" value={value} onChange={inputEnter} />
        <button onClick={addTask} >Add task</button>
      </div>
      <div className='task-list'>
        {tasklist.map((task)=> {
        return (
          <div className='task-container' key={task.id}>
            <li className='task' >{task.task}</li>
            <div className='icons'>
            <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} />
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#000000" }} />
            </div>
          </div>
      )
        }
        
        )}
      </div>
    </div>
    
  )
}

export default Todolist;