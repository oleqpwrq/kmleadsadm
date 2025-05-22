export interface Account {
  id: number;
  username: string;
  type: 'Universal' | 'Sender' | 'Spammer';
  name: string;
  tgApiId: string;
  userid: string;
  tgPhone: string;
  node: string;
  chatsType: 'None' | 'Channels' | 'Chats';
  chatsGoal: string;
  tgApiHash: string;
  tgApiSession: string;
  needToJoinChats: boolean;
  chatsCount: number;
} 