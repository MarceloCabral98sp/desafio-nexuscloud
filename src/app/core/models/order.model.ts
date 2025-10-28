import { OrderItem } from "./order-item.model";

export interface Order {
    id?: number;
    orderNumber: string;
    orderDate: Date;
    items: OrderItem[];
    total: number;
}