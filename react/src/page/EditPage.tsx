// components/EditCustomerPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Customer } from "../types/Customer";
import * as memdb from '../../memory/memdb';
import CustomerRecord from "../component/CustomerRecord";

const customerDefault: Customer = {
    id: -1,
    name: "",
    email: "",
    password: "",
};

const EditPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>(customerDefault);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (id) {
                const data = await memdb.get(parseInt(id));
                if (data) {
                    setCustomer(data);
                }
            }
        };
        fetchCustomer();
    }, [id]);

    const handleDeleteCustomer = async (id: number) => {
        await memdb.deleteById(id);
        navigate("/");
    };

    const handleSaveCustomer = async (customer: Customer) => {
        if (customer.id === -1) {
            await memdb.post(customer);
        } else {
            await memdb.put(customer.id, customer);
        }
        navigate("/");
    };

    return (
        <div>
            <CustomerRecord
                customer={customer}
                onDelete={handleDeleteCustomer}
                onCancel={() => navigate("/")}
                onSave={handleSaveCustomer}
            />
        </div>
    );
};

export default EditPage;
