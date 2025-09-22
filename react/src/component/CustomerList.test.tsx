//import type { Customer } from "../types/Customer";
import { render, fireEvent } from '@testing-library/react';
import * as memdb from '../../memory/memdb';
import '@testing-library/jest-dom';
import CustomerList from './CustomerList';

type Customer = {
    id: number;
    name: string;
    email: string;
    password: string;
};

// Mock the memdb module
jest.mock('../../memory/memdb', () => ({
    getAll: jest.fn().mockResolvedValue([
        { id: 1, name: "Alice", email: "a@example.com", password: "pass1" },
        { id: 2, name: "Bob", email: "b@example.com", password: "pass2" },
        { id: 3, name: "Charlie", email: "c@example.com", password: "pass3" },
    ]),
}));

const mockCustomers: Customer[] = [
    { id: 1, name: "Alice", email: "a@example.com", password: "pass1" },
    { id: 2, name: "Bob", email: "b@example.com", password: "pass2" },
    { id: 3, name: "Charlie", email: "c@example.com", password: "pass3" },
];

describe('CustomerList Component', () => {
    beforeEach(() => {
        (jest.spyOn(memdb, 'getAll') as jest.Mock).mockResolvedValue(mockCustomers);
    });


    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders CustomerList component', async () => {
        const { findByText } = render(<CustomerList />);
        expect(await findByText('Customer List')).toBeInTheDocument();
    });

    test('displays customer list', async () => {
        const { findByText } = render(<CustomerList />);
        for (const customer of mockCustomers) {
            expect(await findByText(customer.name)).toBeInTheDocument();
            expect(await findByText(customer.email)).toBeInTheDocument();
            expect(await findByText(customer.password)).toBeInTheDocument();
        }
    });

    test('selects and deselects a customer', async () => {
        const { findByText, getAllByRole } = render(<CustomerList />);
        const aliceCheckbox = getAllByRole('checkbox')[0];
        expect(aliceCheckbox).not.toBeChecked();

        // Select Alice
        fireEvent.click(aliceCheckbox);
        expect(aliceCheckbox).toBeChecked();
        expect((await findByText('Alice')).closest('tr')).toHaveStyle('font-weight: bold');

        // Deselect Alice
        fireEvent.click(aliceCheckbox);
        expect(aliceCheckbox).not.toBeChecked();
        expect((await findByText('Alice')).closest('tr')).toHaveStyle('font-weight: normal');
    });

    test('deletes a selected customer', async () => {
        const {findByText, getAllByRole, queryByText} = render(<CustomerList/>);
        const bobCheckbox = getAllByRole('checkbox')[1];

        // Select Bob
        fireEvent.click(bobCheckbox);
        expect(bobCheckbox).toBeChecked();

        // Delete Bob
        const deleteButton = await findByText('Delete Selected');
        fireEvent.click(deleteButton);

        // Bob should be removed from the list
        expect(queryByText('Bob')).not.toBeInTheDocument();
    });
});
