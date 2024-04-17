import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos,setTodos] = useState([])
  const addTodo = (todo)=>{
    setTodos((prev)=> [{id : Date.now(), ...todo}, ...prev])
  }
  const updateTodo = (id,todo)=>{
    setTodos((prev)=> prev.map((currtodo)=>( currtodo.id===id ? todo : currtodo)))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=> prev.filter((currtodo)=> currtodo.id!=id))
  }

  const toggleComplete = (id)=>{
    setTodos((prev)=> prev.map((currtodo)=> currtodo.id===id ? {...currtodo , completed:!currtodo.completed} : currtodo))
  }

  useEffect(()=>{         // this useEffect is for when we load the page todos should be there 
    const todos = JSON.parse(localStorage.getItem("todos"))       

    if(todos && todos.length >0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{       //  this useEffect is for when any changes happened with todos then it should be reflected to the localstorage todos
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos , addTodo , updateTodo , toggleComplete , deleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-8 ">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 

                  <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {
                    todos.map((currtodo)=>(
                      <div key={currtodo.id} className='w-full'>
                        <TodoItem todo={currtodo}/>
                      </div>
                    ))
                  }
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
