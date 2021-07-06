import React,{useEffect, useState} from "react";
import './App.css';
import kp from './kplogo.png'

// Import Components
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {

  // state stuffs
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]);

  // refresh running
  useEffect(() => {
    getLocalTodos();
  },[]);
  
  // use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos,status]);

  // functions for filter
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  // save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos",JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem("todos",JSON.stringify([]));
    }
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <div className="top">
        <img src={kp} alt="" />
        <header>
          <h1>Kudos <span>Ping</span></h1>
        </header>
      </div>
      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText = {setInputText} 
      setStatus = {setStatus}
      />
      <TodoList 
      filteredTodos = {filteredTodos}
      setTodos={setTodos} 
      todos={todos}
      />
    </div>
  );
}

export default App;