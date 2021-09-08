import { Category } from "./category";

export class Product
{   id?:string;
    name?:string;
    description?:string;
    richdescription?:string;
    image?:string;
    images?:string[];
    brand?:string;
    price?:number;
    rating?:number;
    numreview?:number;
    isfeatured?:boolean;
    countinstock?:number;
    category?:Category;
    datecreated?:string
}