'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Space, Select, Pagination, Input, Modal, message } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

interface UserError {
  id: number;
  messageId: string;
  date: string;
  username: string;
  userid: string;
  chatLink: string;
  errorText: string;
}

// Генерация данных для примера
const generateData = (): UserError[] => {
  return Array.from({ length: 264 }, (_, i) => {
    const id = i + 1;
    const messageId = Math.floor(Math.random() * 10000000000).toString();
    return {
      id,
      messageId,
      date: new Date(Date.now() - (i * 10000000)).toLocaleString('ru-RU'),
      username: Math.random() > 0.3 ? `user${id}` : 'Юзернейма нет',
      userid: (100000000 + id).toString(),
      chatLink: `https://t.me/chat${id}/msg${id}`,
      errorText: `Ошибка отправки сообщения #${id}: ${Math.random() > 0.5 ? 'Пользователь заблокировал бота' : 'Превышен лимит сообщений'}`,
    };
  });
};

export default function UserErrorsPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<UserError[]>([]);
  const [filteredData, setFilteredData] = useState<UserError[]>([]);
  const [displayData, setDisplayData] = useState<UserError[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [filterText, setFilterText] = useState('');
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
        item.errorText.toLowerCase().includes(filterText.toLowerCase())
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
      render: (id: number) => <a href={`/admin/management/usererrors/${id}`}>{id}</a>,
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
      title: 'Текст ошибки',
      dataIndex: 'errorText',
      key: 'errorText',
      ellipsis: true,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 80,
      render: (_: any, record: UserError) => (
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
    message.success('Выбранные ошибки удалены');
  };

  const handleDeleteSingle = (record: UserError) => {
    Modal.confirm({
      title: 'Удалить ошибку?',
      content: `Вы уверены, что хотите удалить ошибку #${record.id}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        setAllData(allData.filter(item => item.id !== record.id));
        message.success('Ошибка удалена');
      },
    });
  };

  const handleAdd = () => {
    router.push('/admin/management/usererrors/add');
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
              <h1 className="text-2xl font-bold text-gray-900">Ошибки отправки сообщений пользователям</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">Ошибки отправки сообщений</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                Добавить ошибку
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
            <div className="flex gap-4">
              <Input
                placeholder="Поиск по ID, username, userid или тексту ошибки..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                allowClear
                style={{ width: '100%' }}
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
                {filteredData.length} ошибок
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
        title="Удалить выбранные ошибки?"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
        okType="danger"
      >
        <p>Вы уверены, что хотите удалить выбранные ошибки?</p>
        <p className="text-gray-500 text-sm mt-2">
          Будет удалено: {selectedRowKeys.length}
        </p>
      </Modal>
    </div>
  );
} 