import { memo } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = memo<CardProps>(({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
