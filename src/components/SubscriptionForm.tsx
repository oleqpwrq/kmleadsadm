'use client';

import { useState } from 'react';
import { Form, Input, Checkbox, Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface SubscriptionFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

export default function SubscriptionForm({ isVisible, onClose, onSubmit }: SubscriptionFormProps) {
  const [form] = Form.useForm();
  const [showTelegramField, setShowTelegramField] = useState(false);

  const handleClose = () => {
    form.resetFields();
    setShowTelegramField(false);
    onClose();
  };

  return (
    <Modal
      title="Оформление подписки"
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      closeIcon={<CloseOutlined className="text-black hover:text-gray-600" />}
      className="tariff-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onSubmit(values);
          handleClose();
        }}
      >
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя' }]}
        >
          <Input placeholder="Введите ваше имя" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Телефон"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш телефон' }]}
        >
          <Input placeholder="+7 (___) ___-__-__" />
        </Form.Item>

        <Form.Item name="useTelegram" valuePropName="checked">
          <Checkbox onChange={(e) => setShowTelegramField(e.target.checked)}>
            Свяжитесь в Telegram
          </Checkbox>
        </Form.Item>

        {showTelegramField && (
          <Form.Item
            name="telegramUsername"
            label="Username Telegram"
            rules={[{ required: true, message: 'Пожалуйста, введите username' }]}
          >
            <Input placeholder="@username" />
          </Form.Item>
        )}

        <Form.Item>
          <div className="flex justify-end space-x-4">
            <Button onClick={handleClose}>
              Отмена
            </Button>
            <Button type="primary" htmlType="submit">
              Оформить подписку
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
} 