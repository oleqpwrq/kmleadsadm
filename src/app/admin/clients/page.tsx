'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Table, Tag, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

interface Client {
  id: number;
  name: string;
  username: string;
  plan: string;
  status: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Фильтруем админа из списка
    const filteredUsers = users.filter((user: any) => user.email !== 'admin');
    setClients(filteredUsers);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активен':
        return 'green';
      case 'Неактивен':
        return 'red';
      default:
        return 'default';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'Базовый':
        return 'Базовый';
      case 'Премиум':
        return 'Премиум';
      case 'не активирован':
        return 'Не активирован';
      default:
        return plan;
    }
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Юзернейм',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Тариф',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => getPlanName(plan),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Client) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => console.log('Просмотр', record)} />
          <Button icon={<EditOutlined />} onClick={() => console.log('Редактирование', record)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Клиенты</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <Table
            columns={columns}
            dataSource={clients}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
} 