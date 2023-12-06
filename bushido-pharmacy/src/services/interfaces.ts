interface IProduct {
  id: string;
  name: string;
  manufacturer: IManufacturer;
  price: number;
  expiryDate: Date;
}

interface IManufacturer {
  id: string;
  name: string;
}
