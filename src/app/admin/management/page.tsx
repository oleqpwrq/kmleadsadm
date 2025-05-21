'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button, Space } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined,
  MessageOutlined,
  CommentOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  RobotOutlined,
  StopOutlined,
  AppstoreOutlined,
  FilterOutlined,
  FileTextOutlined
} from '@ant-design/icons';

interface ManagementItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export default function ManagementPage() {
  const [items] = useState<ManagementItem[]>([
    { id: 'chat-errors', title: 'Ошибки отправки сообщений в чатах', icon: <CloseCircleOutlined className="text-red-500" /> },
    { id: 'chat-messages', title: 'Сообщения в чатах', icon: <MessageOutlined className="text-blue-500" /> },
    { id: 'opinion-validation', title: 'Результаты валидации мнений', icon: <CheckCircleOutlined className="text-green-500" /> },
    { id: 'success-messages', title: 'Успешные сообщения', icon: <CheckCircleOutlined className="text-green-500" /> },
    { id: 'user-errors', title: 'Ошибки отправки сообщений пользователей', icon: <CloseCircleOutlined className="text-red-500" /> },
    { id: 'user-messages', title: 'Сообщения пользователей', icon: <CommentOutlined className="text-blue-500" /> },
    { id: 'accounts', title: 'Аккаунты', icon: <UserOutlined className="text-purple-500" /> },
    { id: 'bots', title: 'Боты', icon: <RobotOutlined className="text-orange-500" /> },
    { id: 'blocked-users', title: 'Заблокированные пользователи', icon: <StopOutlined className="text-red-500" /> },
    { id: 'categories', title: 'Категории', icon: <AppstoreOutlined className="text-green-500" /> },
    { id: 'minus-words', title: 'Минус слова', icon: <FilterOutlined className="text-orange-500" /> },
    { id: 'templates', title: 'Шаблонные сообщения', icon: <FileTextOutlined className="text-blue-500" /> },
  ]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Управление</h1>
          
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded hover:bg-gray-100">
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-gray-900">{item.title}</span>
                </div>
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => console.log('Add', item.id)}
                  >
                    Добавить
                  </Button>
                  <Button 
                    icon={<EditOutlined />}
                    onClick={() => console.log('Edit', item.id)}
                  >
                    Изменить
                  </Button>
                </Space>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 