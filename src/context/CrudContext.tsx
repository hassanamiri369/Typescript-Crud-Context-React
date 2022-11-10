import React , {createContext , useState , Dispatch, SetStateAction}  from "react"



interface IPropsContext {
    children : React.ReactNode;
}

type IData ={
    id : number ;
    name : string;
    email : string;
    task : string;
    complete : boolean;
}

type ICrudContext={
    data : IData | null;
    setData : Dispatch<SetStateAction<IData | null>>
}
export const CrudContext = createContext <ICrudContext | null>(null)



const CrudContextProvider = ({children} : IPropsContext)=>{

    const [data , setData] = useState<IData | null>(null)

    return (
        <CrudContext.Provider value={{data , setData}} >
            {children}
        </CrudContext.Provider>
    )
}

export default CrudContextProvider