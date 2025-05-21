'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import { LogoutOutlined, SwapOutlined } from '@ant-design/icons';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#F2056F"/>
    <path d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="4" fill="white"/>
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Проверяем, находимся ли мы на странице дашборда или админ-панели
    const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
    setIsAuthorized(isDashboard);
    setIsAdmin(pathname.startsWith('/admin'));
  }, [pathname]);

  const handleLogout = () => {
    // Здесь можно добавить логику выхода
    router.push('/login');
  };

  const handleSwitchAccount = () => {
    // Здесь можно добавить логику смены аккаунта
    router.push('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold text-text">KMLeads</span>
          </Link>

          {isAuthorized && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-bold text-text">
                {isAdmin ? 'Панель администратора' : 'Личный кабинет'}
              </span>
            </div>
          )}

          {!isAuthorized ? (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-text hover:text-primary transition-colors">
                Возможности
              </Link>
              <Link href="/tariffs" className="text-text hover:text-primary transition-colors">
                Тарифы
              </Link>
              <Link href="/login">
                <Button type="primary" className="bg-primary hover:bg-primary/90">
                  Войти
                </Button>
              </Link>
            </nav>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                icon={<SwapOutlined />} 
                onClick={handleSwitchAccount}
                className="text-primary border-primary/20 hover:border-primary"
              >
                Сменить аккаунт
              </Button>
              <Button 
                icon={<LogoutOutlined />} 
                onClick={handleLogout}
                danger
              >
                Выйти
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 