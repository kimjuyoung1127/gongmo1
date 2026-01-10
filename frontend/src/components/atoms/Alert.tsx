import { memo } from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Alert = memo<AlertProps>(({
  children,
  variant = 'info',
  className = '',
}) => {
  const variantStyles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div
      className={`p-4 border rounded-md ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
