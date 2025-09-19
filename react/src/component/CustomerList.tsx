
import React from "react";


//create a basic example list of customer records.
//Style: name, email, password

const staticData = [
    {name: "John Doe", email: "jdoe@example.com", password: "password123"},
    {name: "Jane Smith", email: "janesmith@example.com",password: "mypassword"},
    {name: "Alice Johnson", email: "aj@example.com", password: "alice2024"}
]

//This component will display the list of customers in a table format.
const CustomerList: React.FC = () => {
    return (
        <div>
            <h2>Customer List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {staticData.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
