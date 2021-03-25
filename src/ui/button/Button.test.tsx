import { screen, render } from 'tests';

import { Button } from './Button';

describe('Button', () => {
  it('renders button correctly', () => {
    render(<Button className="test-class">Button</Button>);

    const element = screen.getByRole('button');

    expect(element).toBeInTheDocument();
  });

  it('has proper classes', () => {
    const { container } = render(
      <Button color="secondary" className="test-class">
        Button
      </Button>,
    );

    expect(screen.getByRole('button')).toBeTruthy();
    expect(container.querySelector('.button--secondary')).toBeTruthy();
    expect(container.querySelector('.test-class')).toBeTruthy();
  });

  it('is disabled', () => {
    render(
      <Button color="secondary" className="test-class" disabled>
        Button
      </Button>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    render(
      <Button color="secondary" className="test-class" isLoading>
        Button
      </Button>,
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders as link', () => {
    render(
      <Button as="a" href="#" color="secondary" className="test-class" isLoading>
        Button
      </Button>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
