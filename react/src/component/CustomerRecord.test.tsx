import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CustomerRecord from './CustomerRecord';


describe("CustomerRecord Component Tests", () => {

    it('CustomerRecord renders Edit Custome', () => {
        const customer = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: '1234'
        };
        const onDelete = console.log;
        const onSave = console.log;
        render(
            <CustomerRecord
                customer={customer}
                onDelete={onDelete}
                onSave={onSave}
            />
        );
        expect(screen.getByText(/Edit Customer/i)).toBeInTheDocument();
    })

    it('CustomerRecord renders New Customer', () => {
        const customer = {
            id: -1,
            name: '',
            email: '',
            password: ''
        };
        const onDelete = console.log;
        const onSave = console.log;
        render(
            <CustomerRecord
                customer={customer}
                onDelete={onDelete}
                onSave={onSave}
            />
        );
        expect(screen.getByText(/Add New Customer/i)).toBeInTheDocument();
    })

    

})