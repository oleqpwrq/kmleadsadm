'use client';

import { useEffect } from 'react';
import crypto from 'crypto';

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: any) => void;
    };
  }
}

interface TelegramLoginButtonProps {
  onAuth: (user: any) => void;
}

const BOT_TOKEN = '8182591403:AAE0eCA22OOqKtI_VVG6VAWG4wn9LtXBUjs';
const BOT_USERNAME = 'KMLeadsBot'; // Имя бота должно совпадать с тем, что установлено в @BotFather

const TelegramLoginButton = ({ onAuth }: TelegramLoginButtonProps) => {
  useEffect(() => {
    // Функция для проверки подписи данных
    const verifyTelegramData = (data: any) => {
      const { hash, ...userData } = data;
      
      // Создаем строку для проверки
      const checkString = Object.keys(userData)
        .sort()
        .map(k => `${k}=${userData[k]}`)
        .join('\n');
      
      // Создаем секретный ключ
      const secretKey = crypto
        .createHash('sha256')
        .update(BOT_TOKEN)
        .digest();
      
      // Создаем HMAC
      const hmac = crypto
        .createHmac('sha256', secretKey)
        .update(checkString)
        .digest('hex');
      
      return hmac === hash;
    };

    // Добавляем скрипт Telegram Widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', BOT_USERNAME);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;

    // Добавляем функцию обратного вызова
    window.TelegramLoginWidget = {
      dataOnauth: (user: any) => {
        if (verifyTelegramData(user)) {
          onAuth(user);
        } else {
          console.error('Invalid Telegram data');
        }
      },
    };

    // Добавляем скрипт на страницу
    document.body.appendChild(script);

    // Очистка при размонтировании
    return () => {
      document.body.removeChild(script);
      delete window.TelegramLoginWidget;
    };
  }, [onAuth]);

  return (
    <div className="flex justify-center">
      <div id="telegram-login-button" />
    </div>
  );
};

export default TelegramLoginButton; 