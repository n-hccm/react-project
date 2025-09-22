
import React from "react";
import type { Customer } from "../types/Customer";
import CustomerRecord from './CustomerRecord';
import * as memdb from '../../memory/memdb';

interface CustomerListProps {
    customers?: Customer[];
}

const customerDefault: Customer = {
    id: -1,
    name: "",
    email: "",
    password: ""
};


const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
    const [data, setData] = React.useState<Customer[]>(customers ?? []);
    const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>(customerDefault);


    // Método para refrescar los datos
    const refreshData = async () => {
        if (customers) {
            setData(customers);
        } else {
            const result = await memdb.getAll();
            setData(result);
        }
    };

    React.useEffect(() => {
        refreshData();
    }, [customers]);


    const handleDeleteCustomer = async (id: number) => {
        await memdb.deleteById(id);
        await refreshData();
        setSelectedCustomer(customerDefault);
    };


    const handleSaveCustomer = async (customer: Customer) => {
        if (customer.id === -1) {
            // New customer
            await memdb.post(customer);
        } else {
            // Existing customer
            await memdb.put(customer.id, customer);
        }
        await refreshData();
        setSelectedCustomer(customerDefault);
    }

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
                                    fontWeight: selectedCustomer === customer ? "bold" : "normal"
                                }}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomer === customer}
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
            <CustomerRecord

                customer={selectedCustomer ?? customerDefault}
                onDelete={handleDeleteCustomer}
                onCancel={() => setSelectedCustomer(customerDefault)}
                onSave={(customer: Customer) => handleSaveCustomer(customer)}

            />
        </>
    );
};

export default CustomerList;