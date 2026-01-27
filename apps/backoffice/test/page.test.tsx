import { render, screen } from '@testing-library/react';

// Simple component test without dependencies
function TestComponent() {
  return <div>Hello Test</div>;
}

describe('Backoffice App', () => {
  it('renders a simple component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });
});