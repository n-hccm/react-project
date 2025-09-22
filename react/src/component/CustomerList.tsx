
import React from "react";
import type { Customer } from "../types/Customer";
import CustomerRecord from './CustomerRecord';
import * as memdb from '../../memory/memdb';

const customerDefault: Customer = {
    id: -1,
    name: "",
    email: "",
    password: ""
};


const CustomerList: React.FC = () => {
    const [data, setData] = React.useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>(customerDefault);
    const [search, setSearch] = React.useState("");
    const [appliedSearch, setAppliedSearch] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch("http://localhost:4000/customers").then(res => res.json());
            setData(result);
        };
        fetchData();
    }, []);

    const handleDeleteCustomer = async (id: number) => {
        await memdb.deleteById(id);
        // Refresh data
        const result = await memdb.getAll();
        setData(result);
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
        // Refresh data
        const result = await memdb.getAll();
        setData(result);
        setSelectedCustomer(customerDefault);
    }

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(prev => (prev?.id === customer.id ? customerDefault : customer));
    };

    // Filtrar solo si hay búsqueda aplicada
    const filteredData = appliedSearch
        ? data.filter(
            (customer) =>
                customer.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
                customer.email.toLowerCase().includes(appliedSearch.toLowerCase())
        )
        : data;

    return (
        <>
            <div>
                <h2>Customer List</h2>
                <div style={{ marginBottom: "1rem" }}>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ padding: "0.5rem", width: "60%" }}
                    />
                    <button onClick={() => setAppliedSearch(search)} style={{ marginLeft: 8, backgroundColor: "blue", color: "white" }}>Buscar</button>
                    <button onClick={() => { setAppliedSearch(""); setSearch(""); }} style={{ marginLeft: 8, backgroundColor: "gray", color: "white" }}>Limpiar</button>
                </div>
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
                        {filteredData.map((customer) => (
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