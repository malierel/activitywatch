import { Fragment, useMemo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CalendarRange, Globe2, Settings, Table2, Timer, TrendingUp, ListChecks, Search } from 'lucide-react';
import { useHosts } from '@/lib/api/hooks';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { useTheme } from '../theme-provider';

const navItems = [
  { to: '/', label: 'Activity', icon: Timer },
  { to: '/timeline', label: 'Timeline', icon: CalendarRange },
  { to: '/reports', label: 'Reports', icon: Table2 },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/trends', label: 'Trends', icon: TrendingUp },
  { to: '/buckets', label: 'Buckets', icon: Globe2 },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export const AppShell = () => {
  const { data: hosts = [], isLoading, error } = useHosts();
  const { theme, toggleTheme } = useTheme();
  const hostOptions = useMemo(() => (hosts.length ? hosts : ['local']), [hosts]);

  return (
    <div className="min-h-screen bg-surface text-text">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <ListChecks className="h-5 w-5 text-primary" />
            <span>ActivityWatch Next</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted hover:text-text hover:bg-surface-2'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-1.5 shadow-sm">
              <span className="text-xs uppercase tracking-wide text-muted">Host</span>
              <Select disabled={isLoading || !!error} defaultValue={hostOptions[0]}>
                {hostOptions.map((host) => (
                  <option key={host} value={host}>
                    {host}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-1.5 shadow-sm">
              <span className="text-xs uppercase tracking-wide text-muted">Range</span>
              <Select defaultValue="7d">
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </Select>
            </div>
            <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '🌙' : '☀️'}
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};
