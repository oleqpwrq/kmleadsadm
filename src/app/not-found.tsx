import Link from 'next/link';
import { Button } from 'antd';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text mb-4">Страница не найдена</h2>
        <p className="text-text/60 mb-6">Извините, запрашиваемая страница не существует.</p>
        <Link href="/">
          <Button className="bg-[#EF1670] text-white hover:bg-[#EF1670]/90">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
} 