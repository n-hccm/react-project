
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

const PAGE_SIZE = 5;

const CustomerList: React.FC = () => {
    const [data, setData] = React.useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>(customerDefault);
    const [page, setPage] = React.useState(1);
    const [inputPage, setInputPage] = React.useState("1");
    const [totalPages, setTotalPages] = React.useState(1);

    const fetchPage = async (pageNum: number) => {
        const result = await memdb.getPage(pageNum, PAGE_SIZE);
        setData(result.data);
        setPage(result.currentPage);
        setInputPage(result.currentPage.toString());
        setTotalPages(result.totalPages);
    };

    React.useEffect(() => {
        fetchPage(page);
    }, [page]);

    const handleDeleteCustomer = async (id: number) => {
        await memdb.deleteById(id);
        fetchPage(page);
        setSelectedCustomer(customerDefault);
    };

    const handleSaveCustomer = async (customer: Customer) => {
        if (customer.id === -1) {
            await memdb.post(customer);
        } else {
            await memdb.put(customer.id, customer);
        }
        fetchPage(page);
        setSelectedCustomer(customerDefault);
    };

    const handleSelectCustomer = (customer: Customer) => {
        setSelectedCustomer(prev => (prev?.id === customer.id ? customerDefault : customer));
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value);
    };

    const handleInputSubmit = () => {
        const pageNum = parseInt(inputPage, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            setPage(pageNum);
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInputSubmit();
        }
    };

    const handleInputBlur = () => {
        handleInputSubmit();
    };

    return (
        <>
            <div>
                <h2>Customer List (Página {page} de {totalPages})</h2>
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
                                    fontWeight: selectedCustomer.id === customer.id ? "bold" : "normal"
                                }}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomer.id === customer.id}
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

                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={handlePrevPage} disabled={page === 1}>Anterior</button>

                    <label>
                        Página:
                        <input
                            type="number"
                            value={inputPage}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            onBlur={handleInputBlur}
                            min={1}
                            max={totalPages}
                            style={{ width: '60px', marginLeft: '0.5rem' }}
                        />
                        <span> / {totalPages}</span>
                    </label>

                    <button onClick={handleNextPage} disabled={page === totalPages}>Siguiente</button>
                </div>
            </div>

            <CustomerRecord
                customer={selectedCustomer ?? customerDefault}
                onDelete={handleDeleteCustomer}
                onCancel={() => setSelectedCustomer(customerDefault)}
                onSave={handleSaveCustomer}
            />
        </>
    );
};

export default CustomerList;