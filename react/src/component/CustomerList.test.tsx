import { describe, expect, it } from 'vitest'
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CustomerList from './CustomerList';

describe("CustomerList Component Tests", ()=> {

    it('CustomerList renders', () => {
        render(<CustomerList />);
        expect(screen.getByText(/Customer List/i)).toBeInTheDocument()
    })

})