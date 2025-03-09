import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AvatarDefault = ({ profileImg }: { profileImg: string }) => {
  return (
    <Avatar>
      <AvatarImage src={profileImg} />
      <AvatarFallback>UR</AvatarFallback>
    </Avatar>
  );
};

export default AvatarDefault;
