import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: Date | string, format: string) => {
  return dayjs(date).format(format);
};

export const formatPrice = (
  price: number | string,
  currency: 'USD' | 'EUR' | 'GBP' | 'BDT' | 'UAH' = 'USD',
  notation: 'compact' | 'engineering' | 'scientific' | 'standard' = 'standard'
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation
  }).format(Number(price));
};

export const handleWidth = () => {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
};
