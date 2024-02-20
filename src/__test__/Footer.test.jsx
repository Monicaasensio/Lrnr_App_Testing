import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer';

test("Example 1 renders successfully", () => {
    render(<Footer/>);

    const element = screen.getByText(/Links/i);

    expect(element).toBeInTheDocument();
})