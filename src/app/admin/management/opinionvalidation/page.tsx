'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Space, Select, Pagination, Input, Modal, message, Tag } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

interface OpinionValidation {
  id: number;
  date: string;
  eventId: number;
  category: string;
  username: string;
  userid: string;
  chatLink: string;
  msgText: string;
  result: 'positive' | 'neutral' | 'negative';
}

const categories = [
  'Анализ', 'Кроссы', 'Маркетинг', 'Ликвидация', 'Регистрация', 'Бухгалтерия', 'Налоги', 'УК', 'it', 'Кредиты', 'Усадьба', 'Лыжи', 'Приемная', 'Недвижимость', 'Полис ОМС', 'Автоподбор', 'Beer is like wine', 'Гильзовка (ГБЦ)', 'БФЛ - Банкротство', 'Техбаза', 'Парсер', 'Сантехника', 'Пилатес', 'Институт', 'Детский лагерь', 'Охрана', 'Заграничные карты (Алексей)', 'Строительство Коттеджей', 'Телемаркетинг', 'The Zal', 'Лидерландия', 'Кэмпы Ростов',
];
const results = [
  { value: 'positive', label: 'positive' },
  { value: 'neutral', label: 'neutral' },
  { value: 'negative', label: 'negative' },
];

// Генерация данных для примера
const generateData = (): OpinionValidation[] => {
  return Array.from({ length: 12743 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      date: new Date(Date.now() - (i * 10000000)).toLocaleString('ru-RU'),
      eventId: 1000 + id,
      category: categories[Math.floor(Math.random() * categories.length)],
      username: Math.random() > 0.3 ? `user${id}` : 'Юзернейма нет',
      userid: (100000000 + id).toString(),
      chatLink: `https://t.me/chat${id}/msg${id}`,
      msgText: `Текст сообщения #${id} ...`,
      result: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative',
    };
  });
};

export default function OpinionValidationPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<OpinionValidation[]>([]);
  const [filteredData, setFilteredData] = useState<OpinionValidation[]>([]);
  const [displayData, setDisplayData] = useState<OpinionValidation[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | undefined>(undefined);
  const [filterResult, setFilterResult] = useState<string | undefined>(undefined);
  const [filterText, setFilterText] = useState('');
  const pageSize = 10;

  // Инициализация данных
  useEffect(() => {
    const data = generateData();
    setAllData(data);
    setFilteredData(data);
  }, []);

  // Применение фильтров
  useEffect(() => {
    let filtered = [...allData];
    
    if (filterCategory) {
      filtered = filtered.filter(item => item.category === filterCategory);
    }
    if (filterResult) {
      filtered = filtered.filter(item => item.result === filterResult);
    }
    if (filterText) {
      filtered = filtered.filter(item => 
        item.msgText.toLowerCase().includes(filterText.toLowerCase()) ||
        item.username.toLowerCase().includes(filterText.toLowerCase()) ||
        item.userid.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  }, [allData, filterCategory, filterResult, filterText]);

  // Пагинация
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayData(filteredData.slice(start, end));
  }, [currentPage, filteredData]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (id: number) => <a href={`/admin/management/opinionvalidation/${id}`}>{id}</a>,
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      width: 140,
    },
    {
      title: 'TgParserEvent ID',
      dataIndex: 'eventId',
      key: 'eventId',
      width: 120,
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: 'TG Username',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: 'TG Userid',
      dataIndex: 'userid',
      key: 'userid',
      width: 120,
    },
    {
      title: 'TG ChatMsgLink',
      dataIndex: 'chatLink',
      key: 'chatLink',
      width: 180,
      render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Текст сообщения',
      dataIndex: 'msgText',
      key: 'msgText',
      ellipsis: true,
    },
    {
      title: 'Validation result',
      dataIndex: 'result',
      key: 'result',
      width: 120,
      render: (result: string) => (
        <Tag color={result === 'positive' ? 'green' : result === 'neutral' ? 'gold' : 'red'}>{result}</Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 80,
      render: (_: any, record: OpinionValidation) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteSingle(record)}
        />
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    const newAllData = allData.filter(item => !selectedRowKeys.includes(item.id));
    setAllData(newAllData);
    setSelectedRowKeys([]);
    setIsDeleteModalVisible(false);
    message.success('Выбранные результаты удалены');
  };

  const handleDeleteSingle = (record: OpinionValidation) => {
    Modal.confirm({
      title: 'Удалить результат?',
      content: `Вы уверены, что хотите удалить результат #${record.id}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        setAllData(allData.filter(item => item.id !== record.id));
        message.success('Результат удалён');
      },
    });
  };

  const handleAdd = () => {
    router.push('/admin/management/opinionvalidation/add');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 ml-64 overflow-x-hidden">
        <div className="max-w-[calc(100vw-20rem)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Результаты валидации мнений</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">Результаты валидации мнений</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Добавить результат
              </Button>
              <Button 
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push('/admin/management')}
              >
                На страницу управления
              </Button>
            </div>
          </div>

          {/* Фильтры */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="font-semibold mb-4">Фильтры</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Категория</div>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Все категории"
                  options={categories.map(c => ({ value: c, label: c }))}
                  value={filterCategory}
                  onChange={setFilterCategory}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Результат</div>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Все результаты"
                  options={results}
                  value={filterResult}
                  onChange={setFilterResult}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Поиск по тексту</div>
                <Input
                  placeholder="Текст сообщения..."
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                  allowClear
                />
              </div>
            </div>
            <div className="mt-4">
              <Button
                type="default"
                onClick={() => {
                  setFilterCategory(undefined);
                  setFilterResult(undefined);
                  setFilterText('');
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>

          {/* Таблица */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center gap-4">
              <Space>
                <Select
                  style={{ width: 200 }}
                  placeholder="Выберите действие"
                  options={[
                    { value: 'delete', label: 'Удалить выбранные' },
                  ]}
                  onChange={(value) => {
                    if (value === 'delete') {
                      handleDelete();
                    }
                  }}
                />
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleDelete}
                >
                  Удалить выбранные
                </Button>
                <span className="text-gray-500">
                  {selectedRowKeys.length} из {pageSize} выбрано
                </span>
              </Space>
            </div>

            <div className="overflow-x-auto">
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={displayData}
                rowKey="id"
                pagination={false}
                className="w-full"
                scroll={{ x: 'max-content' }}
              />
            </div>

            <div className="p-4 border-t flex justify-between items-center">
              <span className="text-gray-500">
                {filteredData.length} результатов валидации
              </span>
              <Pagination
                current={currentPage}
                total={filteredData.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total) => `Всего ${total} записей`}
              />
            </div>
          </div>
        </div>
      </main>

      <Modal
        title="Удалить выбранные результаты?"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
        okType="danger"
      >
        <p>Вы уверены, что хотите удалить выбранные результаты?</p>
        <p className="text-gray-500 text-sm mt-2">
          Будет удалено: {selectedRowKeys.length}
        </p>
      </Modal>
    </div>
  );
} 