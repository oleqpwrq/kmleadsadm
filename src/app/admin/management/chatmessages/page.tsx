'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Space, Select, Pagination, Modal, message } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

interface ChatMessage {
  id: number;
  chatId: string;
  message: string;
  status: string;
  createdAt: string;
}

// Функция для генерации данных для конкретной страницы
const generatePageData = (page: number): ChatMessage[] => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: (page - 1) * 10 + index + 1,
    chatId: `${1000000000 + (page - 1) * 1000 + index}`,
    message: `Тестовое сообщение ${(page - 1) * 10 + index + 1}`,
    status: ['Отправлено', 'В ожидании', 'Ошибка'][Math.floor(Math.random() * 3)],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
  }));
};

export default function ChatMessagesPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ChatMessage[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const pageSize = 10;
  const totalItems = 404;

  useEffect(() => {
    setData(generatePageData(currentPage));
  }, [currentPage]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'ID чата',
      dataIndex: 'chatId',
      key: 'chatId',
      width: 150,
      render: (text: string) => (
        <a href={`/admin/management/chatmessages/${text}`}>{text}</a>
      ),
    },
    {
      title: 'Сообщение',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status: string) => (
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
          status === 'Отправлено' ? 'bg-green-100 text-green-800' :
          status === 'В ожидании' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 100,
      render: (_, record: ChatMessage) => (
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
    // Здесь будет реальное удаление через API
    const newData = data.filter(item => !selectedRowKeys.includes(item.id));
    setData(newData);
    setSelectedRowKeys([]);
    setIsDeleteModalVisible(false);
    message.success('Выбранные сообщения успешно удалены');
  };

  const handleDeleteSingle = (record: ChatMessage) => {
    Modal.confirm({
      title: 'Удалить сообщение?',
      content: `Вы уверены, что хотите удалить сообщение #${record.id}?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        // Здесь будет реальное удаление через API
        const newData = data.filter(item => item.id !== record.id);
        setData(newData);
        message.success('Сообщение успешно удалено');
      },
    });
  };

  const handleAdd = () => {
    router.push('/admin/management/chatmessages/add');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Сообщения в чатах</h1>
              <div className="text-sm text-gray-500 mt-1">
                <a href="/admin" className="hover:text-gray-700">Главная</a>
                &nbsp;&rsaquo;&nbsp;
                <a href="/admin/management" className="hover:text-gray-700">Управление</a>
                &nbsp;&rsaquo;&nbsp;
                <span className="text-gray-600">Сообщения в чатах</span>
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

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
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

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              rowKey="id"
              pagination={false}
              className="w-full"
            />

            <div className="p-4 border-t flex justify-between items-center">
              <span className="text-gray-500">
                {totalItems} сообщений в чатах
              </span>
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
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
          Будет удалено сообщений: {selectedRowKeys.length}
        </p>
      </Modal>
    </div>
  );
} 