'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, SendOutlined } from '@ant-design/icons';
import Header from '@/components/Header';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  plan: string;
  status: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form] = Form.useForm();

  // Инициализация localStorage при первом рендере
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      // Создаем начальных пользователей
      const initialUsers: User[] = [
        {
          id: 1,
          name: 'Admin',
          username: '@admin',
          email: 'admin',
          password: 'admin',
          plan: 'Админ',
          status: 'Активен'
        },
        {
          id: 2,
          name: 'User',
          username: '@user',
          email: 'qwerty',
          password: 'qwerty',
          plan: 'Базовый',
          status: 'Активен'
        }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  const handleSubmit = (values: any) => {
    if (isRegistering) {
      // Получаем существующих пользователей
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Проверяем, не существует ли уже пользователь с таким email
      if (users.some(user => user.email === values.email)) {
        message.error('Пользователь с таким email уже существует');
        return;
      }

      // Создаем нового пользователя
      const newUser: User = {
        id: Date.now(),
        name: values.name,
        username: values.telegramUsername,
        email: values.email,
        password: values.password,
        plan: 'не активирован',
        status: 'После регистрации'
      };

      // Добавляем пользователя в список
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      message.success('Регистрация успешна!');
      setIsRegistering(false);
      form.resetFields();
    } else {
      // Получаем пользователей
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Ищем пользователя с введенными данными
      const user = users.find(
        u => u.email === values.email && u.password === values.password
      );

      if (user) {
        // Сохраняем информацию о текущем пользователе
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        if (user.email === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        message.error('Неверный email или пароль');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="p-8 bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg">
            <h1 className="text-2xl font-bold text-text text-center mb-8">
              {isRegistering ? 'Регистрация' : 'Вход'}
            </h1>
            
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              {isRegistering && (
                <>
                  <Form.Item
                    name="telegramUsername"
                    rules={[{ required: true, message: 'Введите юзернейм в телеграм' }]}
                  >
                    <Input prefix={<SendOutlined />} placeholder="Юзернейм в телеграм" />
                  </Form.Item>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Введите имя' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Имя" />
                  </Form.Item>
                </>
              )}
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Введите email' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Введите пароль' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
              </Form.Item>
              {isRegistering && (
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Подтвердите пароль' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Подтвердите пароль" />
                </Form.Item>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                </Button>
              </Form.Item>
              <div className="text-center">
                <Button type="link" onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </Button>
              </div>
            </Form>

            <div className="mt-8 text-center text-sm text-text/60">
              <p>Для демонстрации используйте:</p>
              <p className="mt-2">Админ: admin / admin</p>
              <p>Пользователь: qwerty / qwerty</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 