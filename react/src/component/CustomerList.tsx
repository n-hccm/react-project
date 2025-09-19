import React from "react";
import type { Customer } from "../types/Customer";
import CustomerRecord from './CustomerRecord'


interface CustomerListProps {
  list: Customer[];
}

const customerDefault: Customer = {
    uid: -1,
    name: "",
    email: "",
    password: ""
};

const CustomerList: React.FC<CustomerListProps> = ({ list }) => {
    const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>();

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(prev => (prev?.uid === customer.uid ? customerDefault : customer));
    };
    return (
        <>
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
                {list.map((customer) => (
                    <tr key={customer.uid} style={{ fontWeight: selectedCustomer?.uid === customer.uid ? "bold" : "normal" }}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedCustomer?.uid === customer.uid}
                                onChange={() => handleSelectCustomer(customer)}
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
        <CustomerRecord customer={selectedCustomer ?? customerDefault} />
</>
    );
};

export default CustomerList;
