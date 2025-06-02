

import React, { memo } from 'react';

interface EscudoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const EscudoLogo = memo(({ className = '', size = 'md' }: EscudoLogoProps) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <img 
      src="/lovable-uploads/d3556a31-0de8-473b-ae7c-7d9926910a11.png" 
      alt="Escudo Logo" 
      className={`${sizeClasses[size]} object-contain ${className}`}
      loading="eager"
    />
  );
});

EscudoLogo.displayName = 'EscudoLogo';

export { EscudoLogo };

