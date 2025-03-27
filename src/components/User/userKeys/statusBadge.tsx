import { KeyStatus } from './types';

interface StatusBadgeProps {
  status: KeyStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${status.className}`}>
    {status.label}
  </span>
);