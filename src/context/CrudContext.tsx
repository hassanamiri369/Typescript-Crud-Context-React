import React , {createContext , useState , Dispatch, SetStateAction}  from "react"


interface IPropsContext {
    children : React.ReactNode;
}


export type IData ={
    id : number ;
    name : string;
    email : string;
    task : string;
    complete : boolean;
}


export type ICrudContext={
    data : IData[] ;
    setData : Dispatch<SetStateAction<IData[]>>;
    AddTask : (newTask : IData)=> void;
    removeTask : (id : number) => void;
    completeTask : (id : number) => void;
    editData : (updateModalState : IData) => void
}


export const CrudContext = createContext <ICrudContext>({} as ICrudContext)



const CrudContextProvider = ({children} : IPropsContext)=>{

    const [data , setData] = useState<IData[]>([{ id : 1 , name : "hassan amiri" , email : "hassanamiri369@gmail.com" , task : "create crud app" , complete  : false}] as IData[])

    const AddTask = (newTask : IData) : void =>{
        setData([...data ,newTask])
    }


    const removeTask = (id : number) : void=>{
        const dataAfterRemove = data.filter(item => item.id !== id)
        setData(dataAfterRemove)
    }

    const completeTask = (id : number) : void=> {
        const upDataTask = data.map(item => item.id === id ? {...item , complete : !item.complete} : item)
        setData(upDataTask)
    }


    const editData = (updateModalState : IData) => {
        let newData = updateModalState;
        let crudData = [...data]
        let index = data.findIndex(item => item.id === newData.id )
        crudData[index] = newData;
        setData(crudData)
    }
    



    return (
        <CrudContext.Provider value={{data , setData ,AddTask,removeTask ,completeTask , editData }} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider