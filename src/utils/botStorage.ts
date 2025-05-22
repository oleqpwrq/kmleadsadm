import { Bot } from '@/types/bot';

const STORAGE_KEY = 'botsData';

export const getBots = (): Bot[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing bots data:', error);
    return [];
  }
};

export const addBot = (bot: Bot): void => {
  const bots = getBots();
  bots.push(bot);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bots));
  window.dispatchEvent(new Event('storage'));
};

export const updateBot = (bot: Bot): void => {
  const bots = getBots();
  const index = bots.findIndex(b => b.id === bot.id);
  if (index !== -1) {
    bots[index] = {
      ...bot,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bots));
    window.dispatchEvent(new Event('storage'));
  }
};

export const deleteBot = (id: number): void => {
  const bots = getBots();
  const filteredBots = bots.filter(bot => bot.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBots));
  window.dispatchEvent(new Event('storage'));
}; 