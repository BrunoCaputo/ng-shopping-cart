import { IPaymentMethod } from 'src/app/features/cart/models';

export const paymentMethodsMock: IPaymentMethod[] = [
  { method: 'Credit Card', discountPercentage: 0 },
  { method: 'Debit Card', discountPercentage: 0 },
  { method: 'PIX', discountPercentage: 15 },
  { method: 'Bank Billet', discountPercentage: 10 }, // Boleto
];
