import { Button } from '@/components/ui/button';

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
    <h1 className="text-4xl font-bold">404</h1>
    <p className="text-muted">The page you are looking for does not exist.</p>
    <Button onClick={() => (window.location.href = '/next')}>Go home</Button>
  </div>
);

export default NotFoundPage;
