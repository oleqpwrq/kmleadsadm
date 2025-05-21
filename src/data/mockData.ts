export interface UserData {
  subscription: {
    endDate: string;
    plan: 'monitoring' | 'analytics' | 'dialogue' | 'autonomy';
  };
  stats: {
    todayLeads: number;
    weekLeads: number;
    keywordMatches: number;
    neuralAnalysis: number;
    chatResponses?: number;
    privateMessages?: number;
    startedDialogs?: number;
  };
}

export const mockUserData: UserData = {
  subscription: {
    endDate: '2025-06-20',
    plan: 'autonomy'
  },
  stats: {
    todayLeads: 15,
    weekLeads: 87,
    keywordMatches: 45,
    neuralAnalysis: 32,
    chatResponses: 28,
    privateMessages: 19,
    startedDialogs: 12
  }
};

export const mockAdminData = {
  totalUsers: 156,
  activeSubscriptions: 142,
  totalLeads: 1245,
  revenue: 45000
};

export interface Tariff {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
  icon: string;
}

export const mockTariffs: Tariff[] = [
  {
    id: 'monitoring',
    name: 'Мониторинг',
    price: 1000,
    features: [
      'Поиск по ключевым словам в Telegram',
      'Мониторинг более 200 000 чатов в реальном времени',
      'Мгновенная доставка уведомлений в течение 4 секунд'
    ],
    description: 'Отличный вариант для начального мониторинга упоминаний о продукте',
    icon: 'SearchOutlined'
  },
  {
    id: 'analytics',
    name: 'Аналитика',
    price: 10000,
    features: [
      'Всё из тарифа "Мониторинг"',
      'Анализ сообщений нейросетью — определение уровня заинтересованности и фильтрация горячих лидов',
      'Автоматическая оценка релевантности запросов'
    ],
    description: 'Подходит для быстрого поиска действительно заинтересованных клиентов',
    icon: 'LineChartOutlined'
  },
  {
    id: 'dialogue',
    name: 'Диалог',
    price: 20000,
    features: [
      'Всё из тарифа "Аналитика"',
      'Ответ нейро-продавцом — мгновенная реакция на запросы',
      'Автоматическая подогрев лидов с отправкой релевантной информации'
    ],
    description: 'Идеально для оперативного взаимодействия с клиентами без участия менеджеров',
    icon: 'MessageOutlined'
  },
  {
    id: 'autonomy',
    name: 'Автономия',
    price: 40000,
    features: [
      'Всё из тарифа "Диалог"',
      'Полная автономия нейро-продавца — бот ведёт сделку от первого сообщения до передачи менеджеру или оформления заказа',
      'Полный цикл общения: от поиска до подогрева и передачи "теплого" лида в отдел продаж'
    ],
    description: 'Максимальная автоматизация всех этапов: минимальное участие менеджеров, максимальная отдача',
    icon: 'RobotOutlined'
  }
]; 