'use client';

import { useEffect } from 'react';
import { Button } from 'antd';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text mb-4">Что-то пошло не так!</h2>
        <Button
          onClick={reset}
          className="bg-[#EF1670] text-white hover:bg-[#EF1670]/90"
        >
          Попробовать снова
        </Button>
      </div>
    </div>
  );
} 