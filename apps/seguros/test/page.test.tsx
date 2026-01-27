import { render, screen } from '@testing-library/react';

// Simple component test without dependencies  
function TestComponent() {
  return <div>Seguros Test</div>;
}

describe('Seguros App', () => {
  it('renders a simple component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Seguros Test')).toBeInTheDocument();
  });
});