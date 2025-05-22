'use client';

import { useState } from 'react';
import { Button, Form, Input, Select, InputNumber, Checkbox, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { Account } from '@/types/account';
import { getAccounts, addAccount } from '@/utils/accountStorage';

export default function AddAccountPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: Account) => {
    setLoading(true);
    try {
      // Получаем текущие данные
      const accounts = getAccounts();
      
      // Генерируем новый ID
      const newId = accounts.length > 0 ? Math.max(...accounts.map(acc => acc.id)) + 1 : 1;
      
      // Создаем новый аккаунт
      const newAccount: Account = {
        ...values,
        id: newId,
        chatsType: values.chatsType || 'None',
        chatsGoal: values.chatsGoal || '-',
        tgApiHash: values.tgApiHash || '',
        tgApiSession: values.tgApiSession || '',
        needToJoinChats: values.needToJoinChats || false,
        chatsCount: values.chatsCount || 500
      };

      // Добавляем аккаунт
      addAccount(newAccount);

      // Вызываем событие для обновления данных в родительском компоненте
      window.dispatchEvent(new Event('storage'));

      message.success('Аккаунт успешно добавлен');
      
      // Возвращаемся на страницу списка
      router.push('/admin/management/accounts');
    } catch (error) {
      console.error('Ошибка при добавлении аккаунта:', error);
      message.error('Ошибка при добавлении аккаунта');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 ml-64 overflow-x-hidden">
        <div className="max-w-[calc(100vw-20rem)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Добавление аккаунта</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management/accounts" className="hover:text-gray-700">Аккаунты</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">Добавление</span>
              </div>
            </div>
            <Button 
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/admin/management/accounts')}
            >
              Назад к списку
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                type: 'Universal',
                chatsType: 'None',
                chatsGoal: '-',
                needToJoinChats: false,
                chatsCount: 500
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="type"
                  label="Тип"
                  rules={[{ required: true, message: 'Выберите тип' }]}
                >
                  <Select>
                    <Select.Option value="Universal">Universal</Select.Option>
                    <Select.Option value="Sender">Sender</Select.Option>
                    <Select.Option value="Spammer">Spammer</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="chatsType"
                  label="Тип чатов"
                  rules={[{ required: true, message: 'Выберите тип чатов' }]}
                >
                  <Select>
                    <Select.Option value="None">None</Select.Option>
                    <Select.Option value="Channels">Channels</Select.Option>
                    <Select.Option value="Chats">Chats</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Имя"
                  rules={[{ required: true, message: 'Введите имя' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Введите username' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="chatsGoal"
                  label="Цель чатов"
                  rules={[{ required: true, message: 'Введите цель чатов' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="userid"
                  label="User ID"
                  rules={[{ required: true, message: 'Введите User ID' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="tgPhone"
                  label="Telegram Phone"
                  rules={[{ required: true, message: 'Введите номер телефона' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="tgApiId"
                  label="Telegram API ID"
                  rules={[{ required: true, message: 'Введите API ID' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="tgApiHash"
                  label="Telegram API Hash"
                  rules={[{ required: true, message: 'Введите API Hash' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="tgApiSession"
                  label="Telegram API Session"
                  rules={[{ required: true, message: 'Введите API Session' }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="needToJoinChats"
                  valuePropName="checked"
                >
                  <Checkbox>Need to join chats</Checkbox>
                </Form.Item>

                <Form.Item
                  name="chatsCount"
                  label="Количество чатов"
                  rules={[{ required: true, message: 'Введите количество чатов' }]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name="node"
                  label="Node"
                  rules={[{ required: true, message: 'Выберите node' }]}
                >
                  <Select>
                    <Select.Option value="1 45.8.99.233">1 45.8.99.233</Select.Option>
                    <Select.Option value="2 188.225.79.45">2 188.225.79.45</Select.Option>
                    <Select.Option value="3 195.58.37.235">3 195.58.37.235</Select.Option>
                    <Select.Option value="4 92.118.113.92">4 92.118.113.92</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button onClick={() => router.push('/admin/management/accounts')}>
                  Отмена
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Сохранить
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
} 