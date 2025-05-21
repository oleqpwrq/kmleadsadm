'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Header from '@/components/Header';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Проверяем учетные данные
      if (email === 'admin' && password === 'admin') {
        // Админ
        router.push('/admin');
      } else if (email === 'qwerty' && password === 'qwerty') {
        // Обычный пользователь
        router.push('/dashboard');
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (err) {
      setError('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="p-8 bg-background/50 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg">
            <h1 className="text-2xl font-bold text-text text-center mb-8">Вход в систему</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Логин
                </label>
                <Input
                  name="email"
                  type="text"
                  required
                  prefix={<UserOutlined />}
                  placeholder="Введите логин"
                  className="w-full bg-white border-primary/20 text-text focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Пароль
                </label>
                <Input.Password
                  name="password"
                  required
                  prefix={<LockOutlined />}
                  placeholder="Введите пароль"
                  className="w-full bg-white border-primary/20 text-text focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <Checkbox className="text-text">Запомнить меня</Checkbox>
                <a href="#" className="text-sm text-primary hover:text-primary/80">
                  Забыли пароль?
                </a>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-primary hover:bg-primary/90 text-text"
              >
                Войти
              </Button>
            </form>

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