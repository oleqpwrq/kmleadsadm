'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { mockUserData } from '@/data/mockData';
import { Progress, Card, Statistic, Tag, Button } from 'antd';
import { 
  UserOutlined, 
  MessageOutlined, 
  TeamOutlined,
  MailOutlined,
  CommentOutlined,
  CrownOutlined
} from '@ant-design/icons';

export default function Dashboard() {
  const [userData, setUserData] = useState(mockUserData);

  // Расчет прогресса подписки
  const calculateSubscriptionProgress = () => {
    const endDate = new Date(userData.subscription.endDate);
    const today = new Date();
    const totalDays = 30; // 30 дней подписки
    const remainingDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, (remainingDays / totalDays) * 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-text mb-8">Главная</h1>
          
          {/* Прогресс подписки */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Статус подписки</h2>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${calculateSubscriptionProgress() > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">{calculateSubscriptionProgress() > 0 ? 'Активна' : 'Неактивна'}</span>
              </div>
            </div>
            <Progress 
              percent={calculateSubscriptionProgress()} 
              status="active"
              format={() => `Действует до ${formatDate(userData.subscription.endDate)}`}
            />
          </Card>

          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <Statistic 
                title="Входящих лидов сегодня"
                value={userData.stats.todayLeads}
                prefix={<UserOutlined />}
              />
            </Card>
            <Card>
              <Statistic 
                title="Входящих лидов за неделю"
                value={userData.stats.weekLeads}
                prefix={<TeamOutlined />}
              />
            </Card>
            <Card>
              <Statistic 
                title="Прошли по ключевым словам"
                value={userData.stats.keywordMatches}
                prefix={<MessageOutlined />}
              />
            </Card>
            <Card>
              <Statistic 
                title="Прошли по нейроанализу"
                value={userData.stats.neuralAnalysis}
                prefix={<MailOutlined />}
              />
            </Card>
          </div>

          {/* Дополнительная статистика для тарифов 3 и 4 */}
          {(userData.subscription.plan === 'dialogue' || userData.subscription.plan === 'autonomy') && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <Statistic 
                  title="Ответы в чате"
                  value={userData.stats.chatResponses}
                  prefix={<CommentOutlined />}
                />
              </Card>
              <Card>
                <Statistic 
                  title="Ответы в личных сообщениях"
                  value={userData.stats.privateMessages}
                  prefix={<MailOutlined />}
                />
              </Card>
              <Card>
                <Statistic 
                  title="Диалогов начато"
                  value={userData.stats.startedDialogs}
                  prefix={<MessageOutlined />}
                />
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 