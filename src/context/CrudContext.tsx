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

}
export const CrudContext = createContext <ICrudContext>({} as ICrudContext)



const CrudContextProvider = ({children} : IPropsContext)=>{

    const [data , setData] = useState<IData[]>([{ id : 1 , name : "hassan amiri" , email : "hassanamiri369@gmail.com" , task : "create crud app" , complete  : false}] as IData[])

    

    return (
        <CrudContext.Provider value={{data , setData }} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider