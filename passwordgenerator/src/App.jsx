import { useState,useCallback , useEffect, useRef } from 'react'
import './App.css'


function App() {
  const [length,setLength] = useState(8);
  const [numberallowed ,setnumberallowed] = useState(false);
  const [charallowed ,setcharallowed] = useState(false);
  const [uppercaseall ,setuppercaseall] = useState(false);
  const [password,setPassword] = useState('');
   
  const pasref = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";
    if (uppercaseall) {
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    
    if (numberallowed) {
      str += "0123456789";
    }
    if (charallowed) {
      str += "!@#$%^&*()_+";
     }
     for(let i=1; i <= length; i++) {
       let char = Math.floor(Math.random() * str.length + 1);
       pass += str.charAt(char)
     }
     setPassword(pass);
   }  
  , [length,numberallowed,charallowed ,uppercaseall]);

  const copypassword = useCallback(() => {
    pasref.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]) 


  useEffect(()=>{
    passwordGenerator();
  },[length,numberallowed,charallowed, uppercaseall,passwordGenerator]);


  return(
  <>
   <div className='w-full  mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700'>
    <h1 className='text-2xl text-center font-bold py-2'>Password Generator</h1>
    <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
        value={password}
        className='outline-none w-full px-3 py-1'
        placeholder='Password'
        readOnly 
        ref={pasref}
      />
      <button onClick={copypassword} className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2 justify-center'>
      <div className='flex items-center gap-x-1'>
      <input type="range" 
       min={6}
       max={20}
       value={length} className='cursor-pointer'
       onChange={(e) => setLength(e.target.value)}
       />
       <label> length : {length} </label>
      </div>
       <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked = {numberallowed}
        id='numberInput'
        onChange={()=>{setnumberallowed((prev) => !prev);
        }}
        />
        <label>Numbers</label>

       </div>
       <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked = {charallowed}
        id='charInput'
        onChange={()=>{setcharallowed((prev) => !prev);
        }}
        />
        <label>Characters</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked = {uppercaseall}
        id='charInput'
        onChange={()=>{setuppercaseall((prev) => !prev);
        }}
        />
        <label>UpperCase</label>
       </div>
    </div>
   </div>


  </>
  );
}

export default App
