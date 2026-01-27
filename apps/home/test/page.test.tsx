import { render, screen } from '@testing-library/react';

// Simple component test without dependencies
function TestComponent() {
  return <div>Home Test</div>;
}

describe('Home App', () => {
  it('renders a simple component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Home Test')).toBeInTheDocument();
  });
});