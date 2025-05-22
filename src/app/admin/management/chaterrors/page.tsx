'use client';

import { useState, useEffect } from 'react';
import { Button, Table, Space, Select, Pagination } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

interface ChatError {
  id: number;
  chatId: string;
}

// Функция для генерации данных для конкретной страницы
const generatePageData = (page: number): ChatError[] => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: (page - 1) * 10 + index + 1,
    chatId: `${1000000000 + (page - 1) * 1000 + index}`,
  }));
};

export default function ChatErrorsPage() {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ChatError[]>([]);
  const pageSize = 10; // Уменьшим размер страницы для наглядности
  const totalItems = 404;

  useEffect(() => {
    // Загружаем данные для текущей страницы
    setData(generatePageData(currentPage));
  }, [currentPage]); // Перезагружаем данные при изменении страницы

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ID чата',
      dataIndex: 'chatId',
      key: 'chatId',
      render: (text: string) => (
        <a href={`/admin/management/chaterrors/${text}`}>{text}</a>
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
    console.log('Удаление выбранных элементов:', selectedRowKeys);
    // Здесь будет логика удаления
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Данные будут загружены автоматически через useEffect
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Ошибки отправки сообщений в чатах</h1>
            <Button 
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/admin/management')}
            >
              На страницу управления
            </Button>
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
                {totalItems} ошибок отправки сообщений в чатах
              </span>
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total) => `Всего ${total} записей`}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 