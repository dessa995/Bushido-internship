import { useEffect } from 'react';

export const useSetDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = 'Pharmacy App';
    };
  }, [title]);
};
