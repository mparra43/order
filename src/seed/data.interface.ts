export interface OrderSeed {
    email: string;
    password: string;
    name: string;
    document_type: 'Cédula ciudadanía' | 'Cédula extranjería';
    document_number: string;
    address: string;
    estimatedDeliveryDate: string;
    status: 'ACCEPTED' | 'SENT' | 'CANCELED' | 'DELIVERED';
    products: {
      reference: string;
      quantity: number;
    }[];
  }