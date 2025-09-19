import './App.css'

import CustomerList from './component/CustomerList'
import CustomerRecord from './component/CustomerRecord'


//create a basic example list of customer records.
//Style: name, email, password
const staticData = [
    {uid: 1, name: "John Doe", email: "jdoe@example.com", password: "password123"},
    {uid: 2, name: "Jane Smith", email: "janesmith@example.com",password: "mypassword"},
    {uid: 3, name: "Alice Johnson", email: "aj@example.com", password: "alice2024"}
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
