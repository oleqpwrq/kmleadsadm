import { Account } from '@/types/account';

const STORAGE_KEY = 'accountsData';

export const getAccounts = (): Account[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const updateAccount = (updatedAccount: Account): void => {
  const accounts = getAccounts();
  const updatedAccounts = accounts.map(account => 
    account.id === updatedAccount.id ? { ...account, ...updatedAccount } : account
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAccounts));
};

export const deleteAccount = (accountId: number): void => {
  const accounts = getAccounts();
  const updatedAccounts = accounts.filter(account => account.id !== accountId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAccounts));
};

export const addAccount = (account: Account): void => {
  const accounts = getAccounts();
  accounts.push(account);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}; 