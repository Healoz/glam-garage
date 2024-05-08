export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    imageUrls: string[];
}

export enum Size {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL= 'XL'
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    size: Size;
}