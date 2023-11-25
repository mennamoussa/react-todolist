import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem('tasks');
    const savedTasks = JSON.parse(json);
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);
  useEffect(() => {
    if (tasks.length > 0) {
      const json = JSON.stringify(tasks);
      localStorage.setItem('tasks', json);
    }
  }, [tasks]);

  //submit handler to add task to list
  function submitHandler(e) {
    e.preventDefault();
    let task = document.getElementById('addTask').value;
    const newTask = {
      id: new Date().getTime(),
      text: task.trim(),
      completed: false,
    };
    //makes sure it's not null
    if (newTask.text.length > 0) {
      setTasks([...tasks].concat(newTask));
    } else {
      alert('please enter a valid task');
    }
    document.getElementById('addTask').value = '';
  }

  //delete task
  function deleteTask(id) {
    let updatedList = [...tasks].filter((task) => task.id !== id);
    setTasks(updatedList);
  }
  //checked
  function taskChecked(id) {
    let updatedList = [...tasks].map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedList);
  }
  //edit task
  function taskEditing(newTask) {
    const updatedList = [...tasks].map((task) => {
      if (task.id === newTask.id) {
        task.text = document.getElementById(newTask.id).value;
      }
      return task;
    });
    setTasks(updatedList);
    setEditTask(null);
  }
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={submitHandler}>
        <input type="text" id="addTask" />
        <button type="submit">Add Task</button>
      </form>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <div className="task-text">
            {/* {task.text}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
             */}
            <input
              type="checkbox"
              id="completed"
              checked={task.completed}
              onChange={() => taskChecked(task.id)}
            />
            {task.id === editTask ? (
              <input type="text" id={task.id} defaultValue={task.text} />
            ) : (
              <div>{task.text}</div>
            )}
          </div>
          <div className="task-actions">
            {task.id === editTask ? (
              <button onClick={() => taskEditing(task)}>Submit Edits</button>
            ) : (
              <button onClick={() => setEditTask(task.id)}>Edit</button>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
