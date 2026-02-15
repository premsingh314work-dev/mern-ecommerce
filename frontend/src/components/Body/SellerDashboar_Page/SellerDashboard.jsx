import React ,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import AddProductForm from './AddProductForm';
function SellerDashboard() {
    const [Activeview,setActiveview] = useState("welcome");
    useEffect(()=>{
        console.log(Activeview);  
    },[Activeview])
  return (
    <>
        <div className='flex p-2 bg-gray-100 h-screen w-screen'>
            {/* Side bar*/}
            <SideBar setActiveview={setActiveview}/>
            {/* Showing area */}
            <div className='flex h-full w-full'>
                {
                    (Activeview=='AddProduct')?
                        <AddProductForm/>:<></>
                }

                
            </div>
        </div> 
    </>
  )
}

export default SellerDashboard