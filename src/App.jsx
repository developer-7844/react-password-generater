import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() =>{
    let generatedPassword = '';
    let charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numberSet = '0123456789';
    if(numberAllowed){
      charSet += numberSet;
    }
    if(charAllowed){
      charSet += '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    }
    for(let i=0; i<length; i++){
      generatedPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    setPassword(generatedPassword);
  }, [length, numberAllowed, charAllowed, setPassword])
const copyPassword = useCallback(() => {
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
  
  
}, [password]);
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 pb-4'>
        <h1 className='text-white text-center my-3'> Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'> 
            <input type="text" value={password} ref={passwordRef} className='outline w-full py-1 px-3' readOnly />
            <button onClick={copyPassword} className='outline-none bg-blue-500 text-white  px-3 py-0 shrink-0 ' >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'  onChange={(e)=>{setLength(e.target.value)}} />
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
              setNumberAllowed((prev)=>!prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{
              setCharAllowed((prev)=>!prev);
            }} />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    
  )
}

export default App
