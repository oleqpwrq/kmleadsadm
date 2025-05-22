'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Space, Select, Pagination, Input, Modal, message, Tag } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { Bot } from '@/types/bot';
import { getBots, deleteBot } from '@/utils/botStorage';

// Генерация данных для примера
const generateData = (): Bot[] => {
  return Array.from({ length: 10 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      username: `@bot${id}`,
      name: `Бот ${id}`,
      token: `bot${id}_token_${Math.random().toString(36).substring(7)}`,
      isActive: Math.random() > 0.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });
};

export default function BotsPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<Bot[]>([]);
  const [filteredData, setFilteredData] = useState<Bot[]>([]);
  const [displayData, setDisplayData] = useState<Bot[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [filterText, setFilterText] = useState('');
  const pageSize = 10;

  // Функция обновления данных
  const updateData = () => {
    const bots = getBots();
    if (bots.length === 0) {
      const generatedData = generateData();
      localStorage.setItem('botsData', JSON.stringify(generatedData));
      setAllData(generatedData);
      setFilteredData(generatedData);
    } else {
      setAllData(bots);
      setFilteredData(bots);
    }
  };

  // Инициализация данных
  useEffect(() => {
    updateData();

    // Слушаем событие storage для обновления данных
    const handleStorageChange = () => {
      updateData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('botsUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('botsUpdate', handleStorageChange);
    };
  }, []);

  // Применение фильтров
  useEffect(() => {
    let filtered = [...allData];
    
    if (filterText) {
      filtered = filtered.filter(item => 
        item.username.toLowerCase().includes(filterText.toLowerCase()) ||
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.token.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [allData, filterText]);

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
      render: (id: number) => <a href={`/admin/management/bots/${id}`}>{id}</a>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      render: (username: string, record: Bot) => (
        <a href={`/admin/management/bots/${record.id}`}>{username}</a>
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Токен',
      dataIndex: 'token',
      key: 'token',
      width: 200,
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Активен' : 'Неактивен'}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 80,
      render: (_: any, record: Bot) => (
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
    selectedRowKeys.forEach(key => {
      deleteBot(Number(key));
    });
    
    const bots = getBots();
    setAllData(bots);
    setFilteredData(bots);
    setSelectedRowKeys([]);
    setIsDeleteModalVisible(false);
    message.success('Выбранные боты удалены');
  };

  const handleDeleteSingle = (record: Bot) => {
    Modal.confirm({
      title: 'Удалить бота?',
      content: `Вы уверены, что хотите удалить бота #${record.id}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteBot(record.id);
        const bots = getBots();
        setAllData(bots);
        setFilteredData(bots);
        message.success('Бот удален');
      },
    });
  };

  const handleAdd = () => {
    router.push('/admin/management/bots/add');
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
              <h1 className="text-2xl font-bold text-gray-900">Боты</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">Боты</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Добавить бота
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
            <div className="font-semibold mb-4 text-gray-900">Фильтр</div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Поиск</div>
                <Input
                  placeholder="Поиск по username, имени или токену..."
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
                {filteredData.length} ботов
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
        title="Удалить выбранных ботов?"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
        okType="danger"
      >
        <p>Вы уверены, что хотите удалить выбранных ботов?</p>
        <p className="text-gray-500 text-sm mt-2">
          Будет удалено: {selectedRowKeys.length}
        </p>
      </Modal>
    </div>
  );
} 