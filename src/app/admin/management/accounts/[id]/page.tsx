'use client';

import { useState, useEffect } from 'react';
import { Button, Form, Input, Select, InputNumber, Checkbox, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

// Создаем глобальное состояние для обновления данных
declare global {
  interface Window {
    accountUpdateCallback?: (data: any) => void;
  }
}

interface Account {
  id: number;
  username: string;
  type: 'Universal' | 'Sender' | 'Spammer';
  name: string;
  tgApiId: string;
  userid: string;
  tgPhone: string;
  node: string;
  chatsType: 'None' | 'Channels' | 'Chats';
  chatsGoal: string;
  tgApiHash: string;
  tgApiSession: string;
  needToJoinChats: boolean;
  chatsCount: number;
}

export default function AccountDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    // Загрузка данных аккаунта из localStorage
    const fetchAccount = async () => {
      try {
        const storedData = localStorage.getItem('accountsData');
        if (storedData) {
          const accounts = JSON.parse(storedData);
          const account = accounts.find((acc: Account) => acc.id === parseInt(params.id));
          
          if (account) {
            setAccount(account);
            form.setFieldsValue(account);
            return;
          }
        }
        
        // Если аккаунт не найден, создаем новый
        const mockAccount: Account = {
          id: parseInt(params.id),
          username: 'user' + params.id,
          type: 'Universal',
          name: 'Пользователь ' + params.id,
          tgApiId: Math.floor(Math.random() * 100000000).toString(),
          userid: Math.floor(Math.random() * 10000000000).toString(),
          tgPhone: `79${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
          node: '1 45.8.99.233',
          chatsType: 'None',
          chatsGoal: '-',
          tgApiHash: '0dfc20979aac7d0f855607c83c3403e2',
          tgApiSession: '1ApWapzMBuzbgmpbjfra2cKy0WX5T88uUKt2qgzM5tk6F2ZY1yLw5zInX_HfEo1XH8RkB3w_pD70a1wI-NoYHwizTUAqfFoP21bQzCjt9ArjPhdj-Wgpunt3h6fpjGc8v6ZEKrh3qy-jzOl70EE38ATg1XvfTuiuBn4ykojMhyL40Rxhi8oigLJvDpkliTEpEFK-pBqlOYFRKNtydGt5p7_851AOG_CbeYuif1T436mZbMfqSY5XLTV67UUCHdaKHHkZuy45PD1iRTn_Ql7_P9ZWjU4WpU0QNpCMD-i2Oit7fBwzwFcm3TCixZbWBK5PycvmVVcdnhrEBXD8f6I9jjK5O2uE-qFY=',
          needToJoinChats: false,
          chatsCount: 500
        };
        setAccount(mockAccount);
        form.setFieldsValue(mockAccount);
      } catch (error) {
        message.error('Ошибка при загрузке данных аккаунта');
      }
    };

    fetchAccount();
  }, [params.id, form]);

  const handleSubmit = async (values: Account) => {
    setLoading(true);
    try {
      // Здесь будет API запрос на обновление данных
      console.log('Обновленные данные:', values);
      
      // Обновляем данные через глобальный callback
      if (window.accountUpdateCallback) {
        window.accountUpdateCallback(values);
      }
      
      message.success('Данные успешно обновлены');
      
      // Возвращаемся на страницу списка
      router.push('/admin/management/accounts');
    } catch (error) {
      message.error('Ошибка при обновлении данных');
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 ml-64 overflow-x-hidden">
        <div className="max-w-[calc(100vw-20rem)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Редактирование аккаунта</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management/accounts" className="hover:text-gray-700">Аккаунты</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">{account.name}</span>
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
              initialValues={account}
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