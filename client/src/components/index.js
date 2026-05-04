/**
 * Component Barrel Export
 * Central export point for all shared components
 * Usage: import { Button, Card, Badge, ... } from '@/components'
 */

// Common components
export { default as Button } from './common/Button';
export { default as Card } from './common/Card';
export { default as Badge } from './common/Badge';
export { default as Spinner } from './common/Spinner';
export { default as ProgressBar } from './common/ProgressBar';

// Layout components
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';
export { default as Sidebar } from './layout/Sidebar';

// Chart components
export { default as MatchScoreChart } from './charts/MatchScoreChart';

// Route components
export { default as ProtectedRoute } from './ProtectedRoute';
