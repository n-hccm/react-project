import './App.css'

import CustomerList from './component/CustomerList'
import CustomerRecord from './component/CustomerRecord'


//create a basic example list of customer records.
//Style: name, email, password
const staticData = [
    {name: "John Doe", email: "jdoe@example.com", password: "password123"},
    {name: "Jane Smith", email: "janesmith@example.com",password: "mypassword"},
    {name: "Alice Johnson", email: "aj@example.com", password: "alice2024"}
]

function App() {

  return (
    <>
    <CustomerList list={staticData}/>
    <CustomerRecord customer={staticData[0]}/>
    </>
  )
}

export default App
