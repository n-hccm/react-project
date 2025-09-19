import React from "react";
import type { Customer } from "../types/Customer";
import CustomerRecord from './CustomerRecord'
import * as memdb from '../../memory/memdb';

const CustomerList: React.FC = () => {
    const [data, setData] = React.useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState<number | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await memdb.getAll();
            setData(result);
        };
        fetchData();
    }, []);

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
        setSelectedCustomer(prev => (prev?.id === customer.id ? customerDefault : customer));
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
                {data.map((customer) => (
                    <tr
                        key={customer.id}
                        style={{
                            fontWeight: selectedCustomer === customer.id ? "bold" : "normal"
                        }}
                    >
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedCustomer === customer.id}
                                onChange={() => handleSelectCustomer(customer.id)}
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
