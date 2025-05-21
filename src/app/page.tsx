'use client';

import Header from '@/components/Header';
import AnimatedSection from '@/components/AnimatedSection';
import { MessageOutlined, TeamOutlined, BarChartOutlined, SafetyOutlined } from '@ant-design/icons';

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Статичные элементы фона */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <Header />
      
      {/* Hero секция */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text mb-6">
                Парсинг сообщений в Telegram
              </h1>
              <p className="text-xl text-text/80 mb-8 max-w-3xl mx-auto">
                Автоматизируйте сбор и анализ данных из Telegram групп с помощью нашего мощного инструмента
              </p>
              <button className="bg-primary text-text px-8 py-3 rounded-lg text-lg font-medium hover:opacity-90 transition-all duration-300">
                Начать бесплатно
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Что такое KMLeads */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-text text-center mb-12">
              Что такое KMLeads?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <MessageOutlined className="text-4xl text-primary" />,
                  title: 'Парсинг сообщений',
                  description: 'Автоматический сбор сообщений из Telegram групп'
                },
                {
                  icon: <TeamOutlined className="text-4xl text-primary" />,
                  title: 'Анализ аудитории',
                  description: 'Глубокий анализ участников групп и их активности'
                },
                {
                  icon: <BarChartOutlined className="text-4xl text-primary" />,
                  title: 'Статистика',
                  description: 'Подробная статистика и визуализация данных'
                },
                {
                  icon: <SafetyOutlined className="text-4xl text-primary" />,
                  title: 'Безопасность',
                  description: 'Безопасный и легальный способ сбора данных'
                }
              ].map((feature, index) => (
                <AnimatedSection key={index} className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10">
                  <div className="text-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
                    <p className="text-text/60">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Сбор данных */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text mb-6">
                  Сбор данных из Telegram групп
                </h2>
                <p className="text-text/80 mb-8">
                  Наш инструмент позволяет автоматически собирать и анализировать сообщения из Telegram групп, 
                  помогая вам получать ценную информацию о вашей целевой аудитории.
                </p>
                <ul className="space-y-4">
                  {[
                    'Автоматический сбор сообщений',
                    'Анализ активности участников',
                    'Выявление ключевых тем и трендов',
                    'Экспорт данных в удобном формате'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-text/80">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageOutlined className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Анализ сообщений</h4>
                        <p className="text-sm text-text/60">Автоматический сбор и анализ</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <TeamOutlined className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Статистика участников</h4>
                        <p className="text-sm text-text/60">Подробная информация об активности</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <BarChartOutlined className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Визуализация данных</h4>
                        <p className="text-sm text-text/60">Наглядные графики и отчеты</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
} 