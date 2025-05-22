'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Space, Select, Pagination, Input, Modal, message, Tag } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { Account } from '@/types/account';
import { getAccounts, deleteAccount } from '@/utils/accountStorage';

interface Account {
  id: number;
  username: string;
  type: 'Universal' | 'Sender' | 'Spammer';
  name: string;
  tgApiId: string;
  userid: string;
  tgPhone: string;
  node: string;
  chatsType: string;
  chatsGoal: string;
  tgApiHash: string;
  tgApiSession: string;
  needToJoinChats: boolean;
  chatsCount: number;
}

// Генерация данных для примера
const generateData = (): Account[] => {
  const types: ('Universal' | 'Sender' | 'Spammer')[] = ['Universal', 'Sender', 'Spammer'];
  const nodes = [
    '1 45.8.99.233',
    '2 188.225.79.45',
    '3 195.58.37.235',
    '4 92.118.113.92'
  ];
  
  return Array.from({ length: 202 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      username: `user${id}`,
      type: types[Math.floor(Math.random() * types.length)],
      name: `Пользователь ${id}`,
      tgApiId: Math.floor(Math.random() * 100000000).toString(),
      userid: Math.floor(Math.random() * 10000000000).toString(),
      tgPhone: `79${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
      node: nodes[Math.floor(Math.random() * nodes.length)],
      chatsType: 'None',
      chatsGoal: '-',
      tgApiHash: '',
      tgApiSession: '',
      needToJoinChats: false,
      chatsCount: 500
    };
  });
};

export default function AccountsPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<Account[]>([]);
  const [filteredData, setFilteredData] = useState<Account[]>([]);
  const [displayData, setDisplayData] = useState<Account[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [filterText, setFilterText] = useState('');
  const pageSize = 100;

  // Функция обновления данных
  const updateData = () => {
    const accounts = getAccounts();
    if (accounts.length === 0) {
      const generatedData = generateData();
      localStorage.setItem('accountsData', JSON.stringify(generatedData));
      setAllData(generatedData);
      setFilteredData(generatedData);
    } else {
      setAllData(accounts);
      setFilteredData(accounts);
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
    window.addEventListener('accountsUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('accountsUpdate', handleStorageChange);
    };
  }, []);

  // Применение фильтров
  useEffect(() => {
    let filtered = [...allData];
    
    if (filterType) {
      filtered = filtered.filter(item => item.type === filterType);
    }
    if (filterText) {
      filtered = filtered.filter(item => 
        item.username.toLowerCase().includes(filterText.toLowerCase()) ||
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.tgApiId.toLowerCase().includes(filterText.toLowerCase()) ||
        item.userid.toLowerCase().includes(filterText.toLowerCase()) ||
        item.tgPhone.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [allData, filterType, filterText]);

  // Пагинация
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayData(filteredData.slice(start, end));
  }, [currentPage, filteredData]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Universal':
        return 'blue';
      case 'Sender':
        return 'green';
      case 'Spammer':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (id: number) => <a href={`/admin/management/accounts/${id}`}>{id}</a>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 120,
      render: (username: string, record: Account) => (
        <a href={`/admin/management/accounts/${record.id}`}>{username}</a>
      ),
    },
    {
      title: 'Method',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>{type}</Tag>
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Tg api id',
      dataIndex: 'tgApiId',
      key: 'tgApiId',
      width: 120,
    },
    {
      title: 'Userid',
      dataIndex: 'userid',
      key: 'userid',
      width: 120,
    },
    {
      title: 'Tg phone',
      dataIndex: 'tgPhone',
      key: 'tgPhone',
      width: 120,
    },
    {
      title: 'Node',
      dataIndex: 'node',
      key: 'node',
      width: 150,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 80,
      render: (_: any, record: Account) => (
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
      deleteAccount(Number(key));
    });
    
    const accounts = getAccounts();
    setAllData(accounts);
    setFilteredData(accounts);
    setSelectedRowKeys([]);
    setIsDeleteModalVisible(false);
    message.success('Выбранные аккаунты удалены');
  };

  const handleDeleteSingle = (record: Account) => {
    Modal.confirm({
      title: 'Удалить аккаунт?',
      content: `Вы уверены, что хотите удалить аккаунт #${record.id}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteAccount(record.id);
        const accounts = getAccounts();
        setAllData(accounts);
        setFilteredData(accounts);
        message.success('Аккаунт удален');
      },
    });
  };

  const handleAdd = () => {
    router.push('/admin/management/accounts/add');
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
              <h1 className="text-2xl font-bold text-gray-900">Аккаунты</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">Аккаунты</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Добавить аккаунт
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Тип</div>
                <Select
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Все типы"
                  options={[
                    { value: 'Universal', label: 'Universal' },
                    { value: 'Sender', label: 'Sender' },
                    { value: 'Spammer', label: 'Spammer' },
                  ]}
                  value={filterType}
                  onChange={setFilterType}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Поиск</div>
                <Input
                  placeholder="Поиск по username, имени, ID или телефону..."
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
                  setFilterType(undefined);
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
                {filteredData.length} аккаунтов
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
        title="Удалить выбранные аккаунты?"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
        okType="danger"
      >
        <p>Вы уверены, что хотите удалить выбранные аккаунты?</p>
        <p className="text-gray-500 text-sm mt-2">
          Будет удалено: {selectedRowKeys.length}
        </p>
      </Modal>
    </div>
  );
} 