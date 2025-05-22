'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { mockTariffs } from '@/data/mockData';
import { Card, Tag, Button, message } from 'antd';
import { 
  SearchOutlined, 
  LineChartOutlined, 
  MessageOutlined, 
  RobotOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const iconMap = {
  SearchOutlined: SearchOutlined,
  LineChartOutlined: LineChartOutlined,
  MessageOutlined: MessageOutlined,
  RobotOutlined: RobotOutlined
};

export default function TariffPage() {
  const [selectedTariff, setSelectedTariff] = useState('autonomy');
  const [requestedTariff, setRequestedTariff] = useState<string | null>(null);

  const handleTariffSelect = (tariffId: string) => {
    if (tariffId === selectedTariff) return;
    
    setRequestedTariff(tariffId);
    message.info('Запрос на изменение тарифа отправлен администратору');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Тарифы</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTariffs.map((tariff) => {
              const Icon = iconMap[tariff.icon as keyof typeof iconMap];
              const isSelected = selectedTariff === tariff.id;
              const isRequested = requestedTariff === tariff.id;
              
              return (
                <Card
                  key={tariff.id}
                  className={`relative transition-all duration-300 ${
                    isSelected ? 'border-primary shadow-lg scale-105' : 'hover:border-primary/50'
                  }`}
                >
                  {isSelected && (
                    <Tag 
                      color="#F2056F" 
                      className="absolute -top-3 right-4"
                    >
                      Текущий тариф
                    </Tag>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="text-2xl text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tariff.name}</h3>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {tariff.price.toLocaleString('ru-RU')} ₽
                      <span className="text-sm text-gray-500 font-normal">/мес</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 min-h-[200px]">
                    {tariff.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircleOutlined className="text-primary mt-1 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-sm text-gray-500 mb-6">
                    {tariff.description}
                  </div>

                  <div className="mt-auto">
                    <Button
                      type={isSelected ? 'default' : 'primary'}
                      block
                      className={isSelected ? 'bg-primary/10 text-gray-900' : ''}
                      onClick={() => handleTariffSelect(tariff.id)}
                      disabled={isSelected || isRequested}
                    >
                      {isSelected ? 'Текущий тариф' : isRequested ? 'Запрос отправлен' : 'Выбрать тариф'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
} 