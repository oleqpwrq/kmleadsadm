import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Определяем, скроллим ли мы вниз или вверх
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Скрываем при скролле вниз
      } else {
        setIsVisible(true); // Показываем при скролле вверх
      }
      
      // Определяем, нужно ли сделать хедер прозрачным
      setIsScrolled(currentScrollY > 50);
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-primary">KMLeads</span>
            </Link>
          </div>

          {/* Навигационное меню */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Главная
            </Link>
            <Link href="/news" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Новости
            </Link>
            <Link href="/contacts" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Контакты
            </Link>
            <Link href="/about" className="text-text hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
              О нас
            </Link>
          </nav>

          {/* Кнопка входа */}
          <div>
            <Link
              href="/login"
              className="bg-primary text-text px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 