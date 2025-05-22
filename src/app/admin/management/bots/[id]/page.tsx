'use client';

import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { Bot } from '@/types/bot';
import { getBots, updateBot, deleteBot } from '@/utils/botStorage';

export default function EditBotPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bot, setBot] = useState<Bot | null>(null);

  useEffect(() => {
    const bots = getBots();
    const currentBot = bots.find(b => b.id === Number(params.id));
    if (currentBot) {
      setBot(currentBot);
      form.setFieldsValue(currentBot);
    } else {
      message.error('Бот не найден');
      router.push('/admin/management/bots');
    }
  }, [params.id, form, router]);

  const handleSubmit = async (values: Bot) => {
    setLoading(true);
    try {
      if (!bot) return;

      const updatedBot: Bot = {
        ...bot,
        ...values,
        updatedAt: new Date().toISOString()
      };

      updateBot(updatedBot);
      message.success('Бот успешно обновлен');
      router.push('/admin/management/bots');
    } catch (error) {
      console.error('Ошибка при обновлении бота:', error);
      message.error('Ошибка при обновлении бота');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Удалить бота?',
      content: `Вы уверены, что хотите удалить бота #${params.id}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteBot(Number(params.id));
        message.success('Бот удален');
        router.push('/admin/management/bots');
      },
    });
  };

  if (!bot) {
    return null;
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
              <h1 className="text-2xl font-bold text-gray-900">Редактирование бота</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management/bots" className="hover:text-gray-700">Боты</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">{bot.username}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Удалить
              </Button>
              <Button 
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push('/admin/management/bots')}
              >
                Назад к списку
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={bot}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Введите username бота' }]}
                >
                  <Input placeholder="@bot" />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Имя"
                  rules={[{ required: true, message: 'Введите имя бота' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="token"
                  label="Токен"
                  rules={[{ required: true, message: 'Введите токен бота' }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button onClick={() => router.push('/admin/management/bots')}>
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