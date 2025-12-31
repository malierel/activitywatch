import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/layout/app-shell';
import ActivityPage from './pages/ActivityPage';
import TimelinePage from './pages/TimelinePage';
import ReportsPage from './pages/ReportsPage';
import SearchPage from './pages/SearchPage';
import TrendsPage from './pages/TrendsPage';
import BucketsPage from './pages/BucketsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <ActivityPage /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'trends', element: <TrendsPage /> },
      { path: 'buckets', element: <BucketsPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  },
  { path: '*', element: <NotFoundPage /> }
], { basename: '/next' });

export default routes;
