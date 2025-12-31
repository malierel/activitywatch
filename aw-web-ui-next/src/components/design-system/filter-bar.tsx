import { Filter, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Select } from '../ui/select';
import { Input } from '../ui/input';
import { useState } from 'react';

export interface FilterBarProps {
  onApply?: (filters: Record<string, string>) => void;
  onReset?: () => void;
  hosts?: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ onApply, onReset, hosts = [] }) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    host: hosts[0] ?? 'local',
    range: '7d',
    keyword: ''
  });

  const update = (key: string, value: string) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-muted text-sm">
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </div>
      <Select value={filters.host} onChange={(e) => update('host', e.target.value)}>
        {[filters.host, ...hosts.filter((h) => h !== filters.host)]
          .filter((v, idx, arr) => arr.indexOf(v) === idx)
          .map((host) => (
            <option key={host} value={host}>
              {host}
            </option>
          ))}
      </Select>
      <Select value={filters.range} onChange={(e) => update('range', e.target.value)}>
        <option value="24h">Last 24h</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </Select>
      <Input
        value={filters.keyword}
        onChange={(e) => update('keyword', e.target.value)}
        placeholder="Search or filter keywords"
        className="md:w-64"
      />
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" onClick={() => onReset?.()}>
          <RefreshCw className="h-4 w-4" /> Reset
        </Button>
        <Button onClick={() => onApply?.(filters)}>Apply</Button>
      </div>
    </div>
  );
};
