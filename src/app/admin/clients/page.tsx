'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Table, Tag, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

interface Client {
  id: number;
  name: string;
  username: string;
  plan: 'basic' | 'dialogue' | 'autonomy';
  status: 'active' | 'inactive' | 'blocked';
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь будет запрос к API
    // Временные данные для демонстрации
    setClients([
      {
        id: 1,
        name: 'Иван Петров',
        username: 'ivan_petrov',
        plan: 'dialogue',
        status: 'active'
      },
      {
        id: 2,
        name: 'Мария Сидорова',
        username: 'maria_sidorova',
        plan: 'autonomy',
        status: 'active'
      },
      {
        id: 3,
        name: 'Алексей Иванов',
        username: 'alexey_ivanov',
        plan: 'basic',
        status: 'inactive'
      }
    ]);
    setLoading(false);
  }, []);

  const getPlanName = (plan: string) => {
    const plans = {
      basic: 'Базовый',
      dialogue: 'Диалог',
      autonomy: 'Автономный'
    };
    return plans[plan as keyof typeof plans] || plan;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'green',
      inactive: 'gray',
      blocked: 'red'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getStatusName = (status: string) => {
    const statuses = {
      active: 'Активен',
      inactive: 'Неактивен',
      blocked: 'Заблокирован'
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
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
        <Tag color={getStatusColor(status)}>
          {getStatusName(status)}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Client) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => console.log('Просмотр', record.id)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => console.log('Редактирование', record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Клиенты</h1>
          
          <Table 
            columns={columns} 
            dataSource={clients}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Всего ${total} клиентов`
            }}
          />
        </div>
      </main>
    </div>
  );
} 