export interface IProduct {
  id: string;
  name: string;
  manufacturerDataId: string;
  price: number;
  expiryDate: Date;
}

export interface IManufacturer {
  id: string;
  name: string;
}
