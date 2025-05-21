import { NextResponse } from 'next/server';
import crypto from 'crypto';

const BOT_TOKEN = '8182591403:AAE0eCA22OOqKtI_VVG6VAWG4wn9LtXBUjs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userData = {
      id: searchParams.get('id'),
      first_name: searchParams.get('first_name'),
      last_name: searchParams.get('last_name'),
      username: searchParams.get('username'),
      photo_url: searchParams.get('photo_url'),
      auth_date: searchParams.get('auth_date'),
      hash: searchParams.get('hash'),
    };

    // Проверяем подпись
    const { hash, ...dataToCheck } = userData;
    const checkString = Object.keys(dataToCheck)
      .sort()
      .map(k => `${k}=${dataToCheck[k]}`)
      .join('\n');

    const secretKey = crypto
      .createHash('sha256')
      .update(BOT_TOKEN)
      .digest();

    const hmac = crypto
      .createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    if (hmac !== hash) {
      return NextResponse.json({ error: 'Invalid hash' }, { status: 400 });
    }

    // Проверяем время авторизации (не старше 24 часов)
    const authDate = parseInt(userData.auth_date || '0');
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > 86400) {
      return NextResponse.json({ error: 'Data is outdated' }, { status: 400 });
    }

    // Здесь можно добавить логику создания сессии или JWT токена
    // Пока просто возвращаем данные пользователя
    return NextResponse.json({ user: dataToCheck });
  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 