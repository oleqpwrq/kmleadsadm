'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Space, Select, Pagination, Input, Modal, message } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

interface UserMessage {
  id: number;
  messageId: string;
  date: string;
  username: string;
  userid: string;
  chatLink: string;
  msgText: string;
  status: 'sent' | 'pending' | 'failed';
}

// Генерация данных для примера
const generateData = (): UserMessage[] => {
  return Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    const messageId = Math.floor(Math.random() * 10000000000).toString();
    const statuses: ('sent' | 'pending' | 'failed')[] = ['sent', 'pending', 'failed'];
    return {
      id,
      messageId,
      date: new Date(Date.now() - (i * 10000000)).toLocaleString('ru-RU'),
      username: Math.random() > 0.3 ? `user${id}` : 'Юзернейма нет',
      userid: (100000000 + id).toString(),
      chatLink: `https://t.me/chat${id}/msg${id}`,
      msgText: `Текст сообщения #${id} ...`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
};

export default function UserMessagesPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<UserMessage[]>([]);
  const [filteredData, setFilteredData] = useState<UserMessage[]>([]);
  const [displayData, setDisplayData] = useState<UserMessage[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const pageSize = 100;

  // Инициализация данных
  useEffect(() => {
    const data = generateData();
    setAllData(data);
    setFilteredData(data);
  }, []);

  // Применение фильтров
  useEffect(() => {
    let filtered = [...allData];
    
    if (filterText) {
      filtered = filtered.filter(item => 
        item.messageId.toLowerCase().includes(filterText.toLowerCase()) ||
        item.username.toLowerCase().includes(filterText.toLowerCase()) ||
        item.userid.toLowerCase().includes(filterText.toLowerCase()) ||
        item.msgText.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [allData, filterText, statusFilter]);

  // Пагинация
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayData(filteredData.slice(start, end));
  }, [currentPage, filteredData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Отправлено';
      case 'pending':
        return 'В ожидании';
      case 'failed':
        return 'Ошибка';
      default:
        return status;
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      render: (id: number) => <a href={`/admin/management/usermessages/${id}`}>{id}</a>,
    },
    {
      title: 'Message ID',
      dataIndex: 'messageId',
      key: 'messageId',
      width: 120,
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      width: 140,
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
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <span className={getStatusColor(status)}>
          {getStatusText(status)}
        </span>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 80,
      render: (_: any, record: UserMessage) => (
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
    message.success('Выбранные сообщения удалены');
  };

  const handleDeleteSingle = (record: UserMessage) => {
    Modal.confirm({
      title: 'Удалить сообщение?',
      content: `Вы уверены, что хотите удалить сообщение #${record.id}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        setAllData(allData.filter(item => item.id !== record.id));
        message.success('Сообщение удалено');
      },
    });
  };

  const handleAdd = () => {
    router.push('/admin/management/usermessages/add');
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
              <h1 className="text-2xl font-bold text-gray-900">Сообщения пользователей</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">Сообщения пользователей</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Добавить сообщение
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
            <div className="font-semibold mb-4 text-gray-900">Поиск</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Поиск по ID, username, userid или тексту сообщения..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                allowClear
              />
              <Select
                placeholder="Фильтр по статусу"
                value={statusFilter}
                onChange={setStatusFilter}
                allowClear
                options={[
                  { value: 'sent', label: 'Отправлено' },
                  { value: 'pending', label: 'В ожидании' },
                  { value: 'failed', label: 'Ошибка' },
                ]}
              />
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
                {filteredData.length} сообщений
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
        title="Удалить выбранные сообщения?"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
        okType="danger"
      >
        <p>Вы уверены, что хотите удалить выбранные сообщения?</p>
        <p className="text-gray-500 text-sm mt-2">
          Будет удалено: {selectedRowKeys.length}
        </p>
      </Modal>
    </div>
  );
} 