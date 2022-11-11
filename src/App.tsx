import React, { useContext, useState, FormEvent } from 'react';
import Modal from 'react-modal';
import { BiEdit } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti';

import { TfiFaceSmile } from 'react-icons/tfi';
import { TfiFaceSad } from 'react-icons/tfi';



// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
import { CrudContext } from './context/CrudContext';
import { IData } from './context/CrudContext';

Modal.setAppElement('#root');







function App() {


  const contextData = useContext(CrudContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [task, setTask] = useState<string>("")


  const [modalName , setModalName] = useState("")
  const [modalEmail , setModalEmail] = useState("")
  const [modalTask , setModalTask] = useState("")



  const [modalData , setModalData] = useState<IData >({} as IData)
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);

  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleModal = (item : IData)=>{
    setModalData(item)
    openModal()
  }

  React.useEffect(()=>{

    setModalName(modalData.name)
    setModalEmail(modalData.email)
    setModalTask(modalData.task)
  } , [modalData])




  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask: IData = { id: Number(new Date()), name, email, task, complete: false }
    if (!name) {
      return alert("نام را وارد کنید ")
    }
    if (!email) {
      return alert("ایمیل را وارد کنید ")
    }
    if (!task) {
      return alert("تسک مورد نظر  را وارد کنید ")
    }

    contextData.AddTask(newTask)

    setName("")
    setEmail("")
    setTask("")

  }
  
  const handleModalSubmit = (e : FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    let updateModalState : IData  = {id : modalData.id , complete  : modalData.complete , name : modalName , task : modalTask , email : modalEmail}
    contextData.editData(updateModalState )
    setModalName("")
    setModalEmail("")
    setModalTask("")
    closeModal()
  }
  


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
      <div className="App">

        <div className='add-new-task'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name </label>
              <input type={'text'} placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label>email </label>
              <input type={'text'} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label>Task </label>
              <textarea  value={task} placeholder="task" onChange={(e) => setTask(e.target.value)}></textarea>
            </div>

            <div>
              <button type='submit' >add task</button>
            </div>
          </form>
        </div>

        <div >
          {contextData.data ?
            <div className='container-data'>
              {contextData.data.map((item) => (
                <div className={`${item.complete ? "done" : "doing"}`} key={item.id}>
                  <h2>{item.name}</h2>
                  <h2>{item.email}</h2>
                  
                  <input type={'checkbox'} onChange={() => contextData.completeTask(item.id)} checked={item.complete} /><span>{item.task}</span><br />
                  <span>{item.complete ? <TfiFaceSmile color='green'/> : <TfiFaceSad color='red'/>}</span>
                  <div className="icons-div">
                  <TiDelete className='icons' onClick={() => contextData.removeTask(item.id)} color="red" />
                  <BiEdit className='icons' onClick={()=> handleModal(item)} color="green" />
                  </div>
                </div>
              ))}
            </div> :

            "data list is empty !"}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >

          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form onSubmit={(e)=> handleModalSubmit(e)}>
          <div>
              <label>Name </label>
              <input type={'text'} name="name" placeholder="name" value={modalName} onChange={(e) => setModalName(e.target.value)} />
            </div>

            <div>
              <label>email </label>
              <input type={'text'} name="email" placeholder="email" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} />
            </div>

            <div>
              <label>Task </label>
              <textarea value={modalTask} name="task" onChange={(e) => setModalTask(e.target.value)}></textarea>
            </div>

            <div>
              <button type='submit' >update task</button>
            </div>
          </form>
        </Modal>


      </div>

    </>
  );
}

export default App;
