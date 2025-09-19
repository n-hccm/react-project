import React from "react";

//Testing data.
const staticData = [
    { uid: 1, name: "John Doe", email: "jdoe@example.com", password: "password123" },
    { uid: 2, name: "Jane Smith", email: "janesmith@example.com", password: "mypassword" },
    { uid: 3, name: "Alice Johnson", email: "aj@example.com", password: "alice2024" }
];

const CustomerList: React.FC = () => {
    const [selectedCustomer, setSelectedCustomer] = React.useState<number | null>(null);

    const handleSelectCustomer = (uid: number) => {
        setSelectedCustomer(prev => (prev === uid ? null : uid));
    };

    return (
        <div>
            <h2>Customer List</h2>
            <table>
                <thead>
                <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                {staticData.map((customer) => (
                    <tr
                        key={customer.uid}
                        style={{
                            fontWeight: selectedCustomer === customer.uid ? "bold" : "normal"
                        }}
                    >
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedCustomer === customer.uid}
                                onChange={() => handleSelectCustomer(customer.uid)}
                            />
                        </td>
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
