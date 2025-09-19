import React from "react";
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

    const handleSelectCustomer = (id: number) => {
        setSelectedCustomer(prev => (prev === id ? null : id));
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
    );
};

export default CustomerList;
