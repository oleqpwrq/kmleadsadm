'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Table, Tag, Button, Space, Popconfirm, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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

  // Функция для загрузки клиентов
  const loadClients = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter((user: any) => user.email !== 'admin');
    setClients(filteredUsers);
    setLoading(false);
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Функция для удаления клиента
  const handleDelete = (id: number) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter((user: any) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadClients();
    message.success('Клиент успешно удален');
  };

  // Функция для изменения статуса
  const handleStatusChange = (id: number, newStatus: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user: any) => {
      if (user.id === id) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    loadClients();
    message.success('Статус успешно обновлен');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активен':
        return 'green';
      case 'Неактивен':
        return 'red';
      case 'После регистрации':
        return 'blue';
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
      sorter: (a: Client, b: Client) => a.status.localeCompare(b.status),
      render: (status: string, record: Client) => (
        <select
          value={status}
          onChange={(e) => handleStatusChange(record.id, e.target.value)}
          className="border rounded px-2 py-1"
          style={{ backgroundColor: 'transparent' }}
        >
          <option value="После регистрации">После регистрации</option>
          <option value="Активен">Активен</option>
          <option value="Неактивен">Неактивен</option>
        </select>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Client) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => console.log('Просмотр', record)} />
          <Button icon={<EditOutlined />} onClick={() => console.log('Редактирование', record)} />
          <Popconfirm
            title="Удалить клиента?"
            description="Это действие нельзя будет отменить"
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
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