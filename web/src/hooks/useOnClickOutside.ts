import React, { useEffect } from 'react';

interface Props {
  ref: React.RefObject<HTMLDivElement>;
  handler: () => void;
}

export const useOnClickOutside = ({ ref, handler }: Props) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};
