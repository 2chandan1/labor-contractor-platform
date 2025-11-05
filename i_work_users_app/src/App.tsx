import './App.css'
import Button from '@mui/material/Button';
function App() {
  return (
    <>
     <Button variant="text">Text</Button>
     <div className='m-4'>
      <Button variant="outlined" className='m-4 p-4'>Outlined</Button>
     </div>
     <Button variant="contained" className='pt-4 p-6'>Contained</Button>
    </>
  )
}

export default App
