import Header from '@/components/Header';
import AnimatedSection from '@/components/AnimatedSection';

export default function Home() {
  return (
    <main className="bg-background relative overflow-hidden">
      {/* Статичные фоновые элементы */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Header />
      
      {/* Hero секция */}
      <section className="relative min-h-screen flex items-center justify-center text-text py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                KMLeads — умный инструмент лидогенерации в Telegram
              </h1>
            </AnimatedSection>
            <AnimatedSection>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Автоматический поиск горячих клиентских запросов в 200 000 чатов Telegram
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <p className="text-xl md:text-2xl mb-12">
                Мгновенные ответы от имени вашей компании
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <button className="bg-primary text-text px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105">
                Начать бесплатно
              </button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Что такое KMLeads */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary">Что такое KMLeads?</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Поиск',
                description: 'Мониторит чаты по заданным ключевым словам',
                icon: '🔍'
              },
              {
                title: 'Фильтрация',
                description: 'Определяет релевантные запросы',
                icon: '⚡'
              },
              {
                title: 'Касание',
                description: 'Автоматически вступает в диалог от вашего имени',
                icon: '🤝'
              },
              {
                title: 'Сделка',
                description: 'Передает вам теплых лидов, готовых к общению и покупке',
                icon: '💰'
              }
            ].map((item, index) => (
              <AnimatedSection key={index} className="delay-100">
                <div className="group relative bg-background/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{item.title}</h3>
                  <p className="text-text">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Сбор данных */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary">Сбор данных из групповых чатов в Telegram</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: 'Обширная база чатов',
                description: 'Мы используем собственную, постоянно расширяющуюся и обновляемую базу чатов Telegram. Наша база включает все актуальные и тематические чаты с активной аудиторией и постоянным общением',
                icon: '📊'
              },
              {
                title: 'Релевантность',
                description: 'Чаты выбираются на основе соответствия тематике Вашего продукта или услуги, что обеспечивает точное попадание в целевую аудиторию',
                icon: '🎯'
              }
            ].map((item, index) => (
              <AnimatedSection key={index} className="delay-100">
                <div className="group relative bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-primary">{item.title}</h3>
                  <p className="text-text text-lg">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 