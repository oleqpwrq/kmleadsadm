'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, Progress, Statistic } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  MailOutlined
} from '@ant-design/icons';

interface ProcessingStats {
  skipped: number;
  completed: number;
  error: number;
  inProgress: number;
}

interface ValidationStats {
  noSeller: number;
  categoryMinus: number;
  duplicate: number;
  passed: number;
}

interface ResponseStats {
  sent: number;
  notSent: number;
}

interface SenderStats {
  sender: number;
  spammer: number;
}

export default function AdminDashboard() {
  const [processingStats, setProcessingStats] = useState<ProcessingStats>({
    skipped: 30,
    completed: 45,
    error: 15,
    inProgress: 10
  });

  const [validationStats, setValidationStats] = useState<ValidationStats>({
    noSeller: 20,
    categoryMinus: 15,
    duplicate: 25,
    passed: 40
  });

  const [responseStats, setResponseStats] = useState<ResponseStats>({
    sent: 70,
    notSent: 30
  });

  const [senderStats, setSenderStats] = useState<SenderStats>({
    sender: 80,
    spammer: 20
  });

  const COLORS = ['#EF1670', '#9C0543', '#DA83A7', '#FF00BB', '#720354'];

  const processingData = [
    { name: 'Пропущено', value: processingStats.skipped },
    { name: 'Завершено', value: processingStats.completed },
    { name: 'Ошибка', value: processingStats.error },
    { name: 'В процессе', value: processingStats.inProgress }
  ];

  const validationData = [
    { name: 'Нет продавца', value: validationStats.noSeller },
    { name: 'Категория минус', value: validationStats.categoryMinus },
    { name: 'Дубликат', value: validationStats.duplicate },
    { name: 'Прошло', value: validationStats.passed }
  ];

  const responseData = [
    { name: 'Отправлено', value: responseStats.sent },
    { name: 'Не отправлено', value: responseStats.notSent }
  ];

  const senderData = [
    { name: 'Отправитель', value: senderStats.sender },
    { name: 'Спаммер', value: senderStats.spammer }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Статистика</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Статус обработки */}
            <Card className="bg-white border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Статус обработки</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={processingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {processingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Statistic
                  title="Пропущено"
                  value={processingStats.skipped}
                  prefix={<CloseCircleOutlined />}
                  valueStyle={{ color: COLORS[0] }}
                />
                <Statistic
                  title="Завершено"
                  value={processingStats.completed}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: COLORS[1] }}
                />
                <Statistic
                  title="Ошибка"
                  value={processingStats.error}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: COLORS[2] }}
                />
                <Statistic
                  title="В процессе"
                  value={processingStats.inProgress}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: COLORS[3] }}
                />
              </div>
            </Card>

            {/* Результат валидации */}
            <Card className="bg-white border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Результат валидации</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={validationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {validationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Statistic
                  title="Нет продавца"
                  value={validationStats.noSeller}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: COLORS[0] }}
                />
                <Statistic
                  title="Категория минус"
                  value={validationStats.categoryMinus}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: COLORS[1] }}
                />
                <Statistic
                  title="Дубликат"
                  value={validationStats.duplicate}
                  prefix={<MessageOutlined />}
                  valueStyle={{ color: COLORS[2] }}
                />
                <Statistic
                  title="Прошло"
                  value={validationStats.passed}
                  prefix={<MailOutlined />}
                  valueStyle={{ color: COLORS[3] }}
                />
              </div>
            </Card>

            {/* Отправка ответов */}
            <Card className="bg-white border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Отправка ответов</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={responseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {responseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Statistic
                  title="Отправлено"
                  value={responseStats.sent}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: COLORS[0] }}
                />
                <Statistic
                  title="Не отправлено"
                  value={responseStats.notSent}
                  prefix={<CloseCircleOutlined />}
                  valueStyle={{ color: COLORS[1] }}
                />
              </div>
            </Card>

            {/* Разделение по ответам */}
            <Card className="bg-white border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Разделение по ответам</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={senderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {senderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Statistic
                  title="Отправитель"
                  value={senderStats.sender}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: COLORS[0] }}
                />
                <Statistic
                  title="Спаммер"
                  value={senderStats.spammer}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: COLORS[1] }}
                />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 