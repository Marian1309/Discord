'use client';

import type { FC } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const ThemeToggle: FC = () => {
  console.log('Theme');
  const { setTheme } = useTheme();

  const DROPDOWN_MENU_ITEMS: { label: string; id: number }[] = [
    { label: 'Light', id: 1 },
    { label: 'Dark', id: 2 },
    { label: 'System', id: 3 }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {DROPDOWN_MENU_ITEMS.map(({ label, id }) => (
          <DropdownMenuItem
            onClick={() => setTheme(label.toLowerCase())}
            key={id}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ThemeToggle;
