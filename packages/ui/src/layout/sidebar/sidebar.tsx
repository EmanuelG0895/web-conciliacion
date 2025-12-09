'use client';
import Button from '../../user-interaction/button/button';

interface SidebarProps {
  readonly isOpen?: boolean;
}

function Sidebar({ isOpen = true }: SidebarProps) {
  return (
    <div
      className={`${isOpen ? 'flex' : 'hidden'} bg-gs-yellow dark:bg-gs-yellow-dark text-gs-black relative px-2`}
    >
      <ul className="space-y-3">
        <li>
          <Button variant='ghost'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shield-icon lucide-shield text-gs-black"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              </svg>
              <a href="/seguros" className="text-gs-black">Seguros</a>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;