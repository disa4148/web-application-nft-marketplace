export interface Payment {
  amount: string;
  type: string;
  recipient: number;
}

export interface PaymentResponse {
  amount: number;
  type: string;
  details: {
    bank_name: string;
    card: string;
    fio_card: string;
    fio_sbp: string;
    id: string;
    number: string;
    summ_pay: number;
    summ_real: number;
  };
  status: boolean;
}
