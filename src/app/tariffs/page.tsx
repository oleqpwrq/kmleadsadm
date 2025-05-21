'use client';

import { useState } from 'react';
import { Card, Button } from 'antd';
import Header from '@/components/Header';
import { mockTariffs } from '@/data/mockData';
import SubscriptionForm from '@/components/SubscriptionForm';

export default function TariffsPage() {
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleTariffSelect = (tariff: string) => {
    setSelectedTariff(tariff);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedTariff(null);
  };

  const handleSubmit = async (values: any) => {
    try {
      // Здесь будет логика отправки формы
      console.log('Form values:', values);
    } catch (error) {
      console.error('Произошла ошибка при отправке заявки', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Тарифы</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockTariffs.map((tariff) => (
              <Card
                key={tariff.id}
                className={`relative transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(239,22,112,0.5)] ${
                  selectedTariff === tariff.id ? 'border-primary' : ''
                }`}
              >
                <div className="text-center flex flex-col justify-between" style={{ height: '100%' }}>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{tariff.name}</h3>
                    <p className="text-3xl font-bold mb-4 text-[#EF1670]">
                      {tariff.price} ₽
                      <span className="text-sm text-gray-500 font-normal">/мес</span>
                    </p>
                    
                    <ul className="space-y-2 mb-6 text-left">
                      {tariff.features.map((feature, index) => (
                        <li key={index} className="text-gray-700 flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <p className="text-gray-500 mb-6 text-center">
                      {tariff.description}
                    </p>
                  </div>
                  
                  <div>
                    <Button
                      type="primary"
                      onClick={() => handleTariffSelect(tariff.id)}
                      className="w-full bg-[#EF1670] border-[#EF1670] hover:bg-[#d11464] hover:border-[#d11464]"
                    >
                      Получить предложение
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <SubscriptionForm
            isVisible={isFormVisible}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
          />
        </div>
      </main>

      <style jsx global>{`
        .ant-card {
          border: 1px solid rgba(239, 22, 112, 0.1);
          transition: all 0.3s ease;
        }
        .ant-card:hover {
          border-color: #EF1670;
          box-shadow: 0 0 25px rgba(239, 22, 112, 0.5);
        }
        .ant-btn-primary {
          background: #EF1670 !important;
          border-color: #EF1670 !important;
        }
        .ant-btn-primary:hover {
          background: #d11464 !important;
          border-color: #d11464 !important;
        }
        .ant-btn-primary:active {
          background: #d11464 !important;
          border-color: #d11464 !important;
        }
        .ant-btn-primary:focus {
          background: #EF1670 !important;
          border-color: #EF1670 !important;
        }
      `}</style>
    </div>
  );
} 