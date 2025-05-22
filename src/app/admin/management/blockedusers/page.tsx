'use client';

import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

export default function BlockedUsersPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Заблокированные пользователи</h1>
            <Button 
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/admin/management')}
            >
              На страницу управления
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Здесь будет функционал управления заблокированными пользователями</p>
          </div>
        </div>
      </main>
    </div>
  );
} 