import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CustomerList from './CustomerList';

describe("CustomerList Component Tests", () => {

    it('CustomerList renders', () => {
        render(<CustomerList />);
        expect(screen.getByText(/Customer List/i)).toBeInTheDocument();
    });

    it('Allows selecting an item from the list', async () => {
        // Wait for the checkboxes to render
        const checkboxes = await screen.findAllByRole('checkbox');
        expect(checkboxes.length).toBeGreaterThan(0);

        // Select the first item
        await checkboxes[1].click();
        await checkboxes[0].click();
        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();
    });

    it('clears CustomerRecord and deselects customer in CustomerList when cancel is clicked', async () => {
        // Select the first customer
        // Wait for the checkboxes to render
        const checkboxes = await screen.findAllByRole('checkbox');
        expect(checkboxes.length).toBeGreaterThan(0);

        // Select the first item
        await checkboxes[1].click();
        await checkboxes[0].click();
        expect(checkboxes[0]).toBeChecked();

        const rows = await screen.findAllByRole('row');
        // Filter only table body rows (exclude header)
        const bodyRows = rows.filter(row => row.querySelectorAll('td').length > 0);
        expect(bodyRows.length).toBeGreaterThan(0);

        // Get cells from the first data row
        const firstRowCells = bodyRows[0].querySelectorAll('td');
        // Column 1: name, column 2: email, column 3: password
        const name = firstRowCells[1].textContent;
        const email = firstRowCells[2].textContent;
        const password = firstRowCells[3].textContent;

        // Fill some fields in CustomerRecord
        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(nameInput).toHaveValue(name);
        expect(emailInput).toHaveValue(email);
        expect(passwordInput).toHaveValue(password);

        // Click cancel
        const cancelButton = screen.getByDisplayValue('cancel');
        await cancelButton.click();

        // After cancel, inputs should be cleared
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        // No customer should be selected
        expect(checkboxes[0]).not.toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();
    });

    it('adds a new customer and displays it in the table', async () => {
        // Fill the form for a new customer
        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const saveButton = screen.getByDisplayValue('save');

        fireEvent.change(nameInput, { target: { value: 'New Customer' } });
        fireEvent.change(emailInput, { target: { value: 'new@customer.com' } });
        fireEvent.change(passwordInput, { target: { value: 'newpass' } });

        // Check that the inputs have the correct values before saving
        expect(nameInput).toHaveValue('New Customer');
        expect(emailInput).toHaveValue('new@customer.com');
        expect(passwordInput).toHaveValue('newpass');

        await fireEvent.click(saveButton);
        //Sleep
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Explicitly wait for the new row to appear
        const bodyRows = await screen.findAllByRole('row');
        const dataRows = bodyRows.filter(row => row.querySelectorAll('td').length > 0);
        console.log(dataRows.map(row => row.textContent));

        expect(dataRows.length).toBe(4);
        const lastRowCells = dataRows[dataRows.length - 1].querySelectorAll('td');
        expect(lastRowCells[1].textContent).toBe('New Customer');
        expect(lastRowCells[2].textContent).toBe('new@customer.com');
        expect(lastRowCells[3].textContent).toBe('newpass');
    });

    
    it('modifies an existing customer and updates the table', async () => {
        // Select the first customer
        const checkboxes = await screen.findAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);

        // Change the name and save
        const nameInput = screen.getByPlaceholderText('Name');
        const saveButton = screen.getByDisplayValue('save');
        fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
        await fireEvent.click(saveButton);

        //Sleep
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check that the table is updated
        const rows = await screen.findAllByRole('row');
        const bodyRows = rows.filter(row => row.querySelectorAll('td').length > 0);
        const firstRowCells = bodyRows[0].querySelectorAll('td');
        expect(firstRowCells[1].textContent).toBe('Updated Name');
    });

    it('deletes an existing customer and removes it from the table', async () => {
        // Select the first customer
        const checkboxes = await screen.findAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);
        
        // Explicitly wait for the new row to appear
        const listRows = await screen.findAllByRole('row');
        const dataRows = listRows.filter(row => row.querySelectorAll('td').length > 0);
        console.log(dataRows.map(row => row.textContent));

        const firstRowCellsNotDelete = dataRows[0].querySelectorAll('td');

        // Click delete
        const deleteButton = screen.getByDisplayValue('delete');
        await fireEvent.click(deleteButton);
        //Sleep
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check that the customer is removed from the table
        const rows = await screen.findAllByRole('row');
        const bodyRows = rows.filter(row => row.querySelectorAll('td').length > 0);
        // The first row should not have the deleted customer's name
        const firstRowCells = bodyRows[0].querySelectorAll('td');
        expect(firstRowCells[1]).not.toBe(firstRowCellsNotDelete[1]);
    });


});