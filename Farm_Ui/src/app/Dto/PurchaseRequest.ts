import { address, Coustomer, Order, OrderItems } from "./Customer";

export class PurchaseRequest {
  public customer!: Coustomer;
  public order!: Order;
  public address!: address;
  public orderItems!: OrderItems[];
}