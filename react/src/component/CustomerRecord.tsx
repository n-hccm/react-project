import React, { useState, useEffect } from "react";
import type { Customer } from "../types/Customer";
import * as memdb from '../../memory/memdb';

interface CustomerRecordProps {
    customer: Customer;
}

const defaultCustomer: Customer = {
    id: -1,
    name: '',
    email: '',
    password: ''
};

const CustomerRecord: React.FC<CustomerRecordProps> = ({ customer, onDelete, onCancel, onSave }) => {
    const [formObject, setFormObject] = useState<Customer>(customer);
    const isNewCustomer = customer.id === -1;
    const title = isNewCustomer ? "Add New Customer" : "Edit Customer";

    useEffect(() => {
        setFormObject(customer);
    }, [customer]);
    const [showPassword, setShowPassword] = useState(false);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormObject({ ...formObject, [name]: value });
    };

    //Delete selected customer.
    const deleteSelected = () => {
        onDelete(customer.id);
        console.log("deleteSelected");
    };

    const saveSelected = () => {
        if (customer.id === -1) {
            memdb.post(formObject);
            alert('Cliente creado correctamente');
        } else {
            memdb.put(customer.id, formObject);
            alert('Cliente actualizado correctamente');
        }
        onSave();
    }

    const cancelSelected = () => {
        setFormObject(defaultCustomer);
        if (onCancel) onCancel();
    }

    return (
        <div>
            <h2>Customer Record</h2>
            <h3>{title}</h3>
            <div>
                <input type="text" name={"name"} value={formObject.name} placeholder="Name" onChange={(e) => changeHandler(e)} />
                <input type="email" name={"email"} value={formObject.email} placeholder="Email" onChange={(e) => changeHandler(e)} />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name={"password"}
                        value={formObject.password}
                        placeholder="Password"
                        onChange={(e) => changeHandler(e)}
                        style={{ flex: 1 }}
                    />
                    <button
                        type="button"
                        style={{ marginLeft: '8px', padding: '6px 12px', fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb' }}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            // Open eye
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
                        ) : (
                            // Close eye
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /><line x1="4" y1="4" x2="20" y2="20" stroke="#e53935" strokeWidth="2" /></svg>
                        )}
                    </button>
                </div>
                <div>
                    {!isNewCustomer ? <input className="btn-delete" type="button" value="delete" onClick={() => deleteSelected()} /> : null}
                    
                    <input className="btn-save" type="button" value="save" onClick={() => saveSelected()} />
                    <input className="btn-cancel" type="button" value="cancel" onClick={() => cancelSelected()} />
                </div>
            </div>
        </div>
    );
};

export default CustomerRecord;
