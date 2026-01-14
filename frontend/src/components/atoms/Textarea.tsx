import { memo } from 'react';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const Textarea = memo<TextareaProps>(({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  disabled = false,
  className = '',
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none ${className}`}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
