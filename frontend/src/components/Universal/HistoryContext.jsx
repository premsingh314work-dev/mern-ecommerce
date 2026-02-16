import { createContext, useContext, useEffect, useState } from "react";

const HistoryContext= createContext();

export const HistoryProvider= ({children})=>{
    const [History, setHistory] = useState([]);
    useEffect(()=>{
        // console.log("History Provider called");
        
        const savedHistory = JSON.parse(localStorage.getItem("recentlyViewed")||"[]");
        setHistory(savedHistory);
    },[]);
    const AddToHistory= (product)=>{
        setHistory((prevHistory)=>{
            const cleanHistory = prevHistory.filter(item=> item._id !== product._id);
            const updatedList= [product , ...cleanHistory].slice(0,10);
            localStorage.setItem("recentlyViewed",JSON.stringify(updatedList)); 
            return updatedList;
        })
    }
  return (
    <HistoryContext.Provider value={{ History, AddToHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

export const useHistory = () => useContext(HistoryContext);