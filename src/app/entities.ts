export interface User {
  id?: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  age: Date;
  gender: string;
  role: string;
}

export interface Product {
  id?: number;
  product_name: string;
  latin_name: string;
  description: string;
  plant_section: string;
  family: string;
  image_path:string;
  }

