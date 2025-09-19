import React from "react";
import type { Customer } from "../types/Customer";
import CustomerRecord from './CustomerRecord'


interface CustomerListProps {
  list: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ list }) => {
    const [selectedCustomer, setSelectedCustomer] = React.useState<number | null>(null);

    const handleSelectCustomer = (uid: number) => {
        setSelectedCustomer(prev => (prev === uid ? null : uid));
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
                    <tr key={customer.uid} style={{ fontWeight: selectedCustomer === customer.uid ? "bold" : "normal" }}>
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
        {selectedCustomer !== null && (
            <CustomerRecord customer={list.find(c => c.uid === selectedCustomer)!} />
        )}
</>
    );
};

export default CustomerList;
