export interface Case {
  _id?: string;
  title: string;
  description: string;
  status: string;
  name: string;
  gender: string;
  age: number;
  phoneNumber: string;
  email: string;
  address: string;
  pinCode: string;
  timeOfCrime: string;
  suspect: string;
  location: string;
  createdAt: string;
  imageURL?: string;
  __v?: number;
}
