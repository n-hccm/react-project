import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from '../App';

// ✅ Create a reference to the mock so we can modify it
const mockGetPage = vi.fn();

// 🔁 Mock the module
vi.mock('../../memory/memdb', () => ({
    getPage: (page: number, size: number, search: string) => mockGetPage(page, size, search),
}));

describe('CustomerList Component Tests', () => {

    beforeEach(() => {
        vi.clearAllMocks();

        // Default mock response
        mockGetPage.mockResolvedValue({
            data: [
                { id: 1, name: 'John Doe', email: 'john@example.com', password: '1234' },
            ],
            currentPage: 1,
            totalPages: 1,
        });
    });

    it('CustomerList renders', async () => {
        render(<App />);

        // Verify the title and customer are displayed
        expect(await screen.findByText(/Customer List/i)).toBeInTheDocument();
        expect(await screen.findByText(/john@example.com/i)).toBeInTheDocument();
    });

    it('CustomerList updates on search input', async () => {
        // Ensure the first customer is visible
        expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
        expect(screen.queryByText(/jane@example.com/i)).not.toBeInTheDocument();

        // ✅ Change the mock response for the new search term
        mockGetPage.mockResolvedValueOnce({
            data: [
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'abcd' },
            ],
            currentPage: 1,
            totalPages: 1,
        });

        const searchInput = screen.getByPlaceholderText(/search by name or email/i);

        // Simulate typing "Jane"
        fireEvent.change(searchInput, { target: { value: 'Jane' } });

        // Wait for the table to update with the new result
        await waitFor(() => {
            expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
        });

        // Verify the function was called with lowercase search term
        expect(mockGetPage).toHaveBeenCalledWith(1, 5, 'jane');
    });

    it('Clear button resets the search input and reloads data', async () => {

        // Prepare the mock for searching "Jane"
        mockGetPage.mockResolvedValueOnce({
            data: [
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'abcd' },
            ],
            currentPage: 1,
            totalPages: 1,
        });

        // Type "Jane" in the search input
        const searchInput = screen.getByPlaceholderText(/search by name or email/i);
        fireEvent.change(searchInput, { target: { value: 'Jane' } });

        // Wait for "Jane" to appear
        await waitFor(() => {
            expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
        });

        // Prepare the mock again for clearing the search
        mockGetPage.mockResolvedValueOnce({
            data: [
                { id: 1, name: 'John Doe', email: 'john@example.com', password: '1234' },
            ],
            currentPage: 1,
            totalPages: 1,
        });

        // Click the "Clear" button
        const clearButton = screen.getByRole('button', { name: /clear/i });
        fireEvent.click(clearButton);

        // Wait for the input to be cleared
        expect(searchInput).toHaveValue('');

        // And for the original data (John Doe) to reappear
        await waitFor(() => {
            expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
        });

        // Verify mockGetPage was called with empty search term
        expect(mockGetPage).toHaveBeenLastCalledWith(1, 5, '');
    });

    /*it('Pagination buttons work correctly', async () => {
        mockGetPage.mockClear();
        // Prepare mock for page 1
        mockGetPage.mockResolvedValueOnce({
            data: [
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'abcd' },
            ],
            currentPage: 1,
            totalPages: 1,
        });

        const nextButton = screen.getByRole('button', { name: /Next/i });
        fireEvent.click(nextButton);

        expect(screen.getByText(/Customer List \(Page 2 of 2\)/i)).toBeInTheDocument();
    });*/
});
