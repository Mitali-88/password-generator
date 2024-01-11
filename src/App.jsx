import { useState, useCallback, useEffect ,useRef} from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  // use reff hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "1234567890"
    if (character) str += "@#$%&*^~"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, number, character, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    // to select a particular range
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)

  }, [password])

  useEffect(() => { passwordGenerator() }, [length, number, character, passwordGenerator])
  return (
    <>
      <div className='max-w-md w-full mx-auto shadow-md rounded-lg px-4 py-3 my-60 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none px-3 py-1 w-full'
            placeholder='password'
            readOnly
ref={passwordRef}
          />
          <button
onClick={copyPassword}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}

            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={number}
              id="numberInput"
              onChange={() => { setNumber((prev) => !prev); }}
            />
            
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={character}
              id="charInput"
              onChange={() => { setCharacter((prev) => !prev); }}
            />
            
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
