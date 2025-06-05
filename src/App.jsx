import React, { useContext } from 'react'
import Todolist from './components/todolist';

export const NameContext = React.createContext()

const App = () => {
  return (
    <div>
      <NameContext.Provider value={'Caroline'}>
        <Todolist/>
      </NameContext.Provider>
      
    </div>
  )
}

export default App