'use client';

import { memo } from 'react';
import { Button } from '@/components/atoms';
import { useDictionary } from '@/contexts/DictionaryContext';

interface UserDisplayProps {
  nickname: string;
  onLogout: () => void;
}

export const UserDisplay = memo<UserDisplayProps>(({ nickname, onLogout }) => {
  const dict = useDictionary();

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700 font-medium">{nickname}</span>
      <Button variant="secondary" size="small" onClick={onLogout}>
        {dict.nav.logout}
      </Button>
    </div>
  );
});

UserDisplay.displayName = 'UserDisplay';

export default UserDisplay;
