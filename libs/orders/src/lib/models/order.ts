import { OrderItem } from "./order-item";
import {Users} from '@eweb/users';

export class Order{
    id?:string;
    orderitem?:OrderItem[];
    shippingaddress1?:string;
    shippingaddress2?:string;
    city?:string;
    zip?:string;    
    country?:string;
    phone?:string;
    status?:string;
    totalprice?:number;
    user?:Users;
    dateordered?:string;
}