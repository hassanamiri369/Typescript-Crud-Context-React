import React , {useContext , useState , FormEvent} from 'react';
import { CrudContext } from './context/CrudContext';
import { IData } from './context/CrudContext';


function App() {


  const contextData = useContext(CrudContext)
  
  const [name , setName] = useState<string>("")
  const [email , setEmail] = useState<string>("")
  const [task , setTask] = useState<string>("")

  const handleSubmit = (e : FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const newTask : IData = {id : Number(new Date()) , name , email , task , complete : false}
    if(!name){
      return alert("نام را وارد کنید ")
    }
    if(!email){
      return alert("ایمیل را وارد کنید ")
    }
    if(!task){
      return alert("تسک مورد نظر  را وارد کنید ")
    }

    contextData.AddTask(newTask)

    setName("")
    setEmail("")
    setTask("")
    
  }
  
  console.log(contextData.data)

  return (
    <>
      <div className="App">

        <div className='add-new-task'>
          <form onSubmit={(e)=>handleSubmit(e) }>
            <div>
              <label>Name </label>
              <input type={'text'} placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
            </div>

            <div>
              <label>email </label>
              <input type={'text'} placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div>
              <label>Task </label>
              <textarea value={task} onChange={(e)=> setTask(e.target.value)}></textarea>
            </div>

            <div>
              <button >add task</button>
            </div>
          </form>
        </div>
      
      {contextData.data ? 
      <div>
        {contextData.data.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h2>{item.email}</h2>
            <input type={'checkbox'} onChange={()=> contextData.completeTask(item.id)} checked={item.complete}/><span>{item.task}</span><br/>
            <button onClick={()=> contextData.removeTask(item.id) }>remove</button>
            
          </div>
        ))}
      </div> :
      
      "data list is empty !"}
      {/* {contextData.data.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h2>{item.email}</h2>
            <input type={'checkbox'} onChange={()=> contextData.completeTask(item.id)} checked={item.complete}/><p>{item.task}</p>
            <button onClick={()=> contextData.removeTask(item.id) }>remove</button>
            
          </div>
        ))} */}

  </div>
  
    </>
  );
}

export default App;
