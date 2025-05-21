'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, Select, Button, Input, Table, Space, Statistic } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ChatReport {
  url: string;
  requests: number;
}

interface AccountChats {
  account: string;
  chatCount: number;
}

export default function ChatsPage() {
  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [chatUrls, setChatUrls] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>();

  // Временные данные для демонстрации
  const accounts = [
    { value: 'account1', label: 'Аккаунт 1' },
    { value: 'account2', label: 'Аккаунт 2' },
    { value: 'account3', label: 'Аккаунт 3' },
  ];

  const categories = [
    { value: 'category1', label: 'Категория 1' },
    { value: 'category2', label: 'Категория 2' },
    { value: 'category3', label: 'Категория 3' },
  ];

  const chatReports: ChatReport[] = [
    { url: 'https://t.me/chat1', requests: 15 },
    { url: 'https://t.me/chat2', requests: 8 },
    { url: 'https://t.me/chat3', requests: 23 },
  ];

  const accountChats: AccountChats[] = [
    { account: 'Аккаунт 1', chatCount: 45 },
    { account: 'Аккаунт 2', chatCount: 32 },
    { account: 'Аккаунт 3', chatCount: 28 },
  ];

  const totalChats = accountChats.reduce((sum, item) => sum + item.chatCount, 0);

  const reportColumns = [
    {
      title: 'URL Чата',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Количество заявок',
      dataIndex: 'requests',
      key: 'requests',
    },
  ];

  const accountColumns = [
    {
      title: 'Аккаунт',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Количество чатов',
      dataIndex: 'chatCount',
      key: 'chatCount',
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Чаты</h1>
          
          <div className="space-y-8">
            {/* Добавление чатов */}
            <Card title="Добавить чаты" className="shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Выберите аккаунт
                  </label>
                  <Select
                    className="w-full"
                    placeholder="Выберите аккаунт"
                    options={accounts}
                    value={selectedAccount}
                    onChange={setSelectedAccount}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL чатов (по одному на строку)
                  </label>
                  <Input.TextArea
                    rows={4}
                    value={chatUrls}
                    onChange={(e) => setChatUrls(e.target.value)}
                    placeholder="Введите URL чатов"
                  />
                </div>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => console.log('Add chats', { selectedAccount, chatUrls })}
                >
                  Добавить
                </Button>
              </div>
            </Card>

            {/* Отчет по чатам */}
            <Card title="Отчет по чатам" className="shadow-sm">
              <div className="mb-4">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория чата
                    </label>
                    <Select
                      className="w-full"
                      placeholder="Выберите категорию"
                      options={categories}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                    />
                  </div>
                  <Button 
                    type="primary"
                    onClick={() => console.log('Filter by category', selectedCategory)}
                  >
                    Подтвердить
                  </Button>
                </div>
              </div>
              <Table 
                columns={reportColumns} 
                dataSource={chatReports}
                rowKey="url"
              />
            </Card>

            {/* Все чаты на аккаунтах */}
            <Card title="Все чаты на аккаунтах" className="shadow-sm">
              <div className="mb-6">
                <Statistic 
                  title="Чатов всего" 
                  value={totalChats}
                  className="text-center"
                />
              </div>
              <Table 
                columns={accountColumns} 
                dataSource={accountChats}
                rowKey="account"
                pagination={false}
              />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 