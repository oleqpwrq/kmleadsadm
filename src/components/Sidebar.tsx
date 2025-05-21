'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  MessageOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith('/admin');

  const handleLogout = () => {
    // Здесь будет логика выхода
    router.push('/');
  };

  const adminMenuItems = [
    { key: 'dashboard', label: 'Статистика', icon: <HomeOutlined />, path: '/admin' },
    { key: 'clients', label: 'Клиенты', icon: <TeamOutlined />, path: '/admin/clients' },
    { key: 'chats', label: 'Чаты', icon: <MessageOutlined />, path: '/admin/chats' },
    { key: 'management', label: 'Управление', icon: <SettingOutlined />, path: '/admin/management' },
  ];

  const userMenuItems = [
    { key: 'dashboard', label: 'Главная', icon: <HomeOutlined />, path: '/dashboard' },
    { key: 'tariff', label: 'Тарифы', icon: <TeamOutlined />, path: '/dashboard/tariff' },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-background/50 backdrop-blur-sm border-r border-primary/10 p-4 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-[#EF1670] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <h1 className="text-xl font-bold text-text">KMLeads</h1>
        </div>
        <h2 className="text-xl font-bold text-text">
          {isAdmin ? 'Панель администратора' : 'Личный кабинет'}
        </h2>
      </div>

      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              pathname === item.path
                ? 'bg-primary text-text'
                : 'text-text/60 hover:bg-primary/10 hover:text-text'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-4 mt-auto border-t border-primary/10">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-center text-[#EF1670] border-[#EF1670] hover:bg-[#EF1670]/10 hover:text-[#EF1670] hover:border-[#EF1670] hover:scale-105 hover:shadow-[0_0_15px_rgba(239,22,112,0.3)] transition-all duration-300"
          icon={<LogoutOutlined />}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
} 