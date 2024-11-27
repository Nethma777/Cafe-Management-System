import { state } from "@angular/animations";
import { Injectable } from "@angular/core";

export interface Menu{
    state: string;
    name: string;
    icon: string;
    role: string;
    
}

const MENUITEMS = [
    {state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: ''},
    {state: 'category', name: 'Manage Category', icon: 'category', role: 'admin'},
    {state: 'product', name: 'Manage Product', icon: 'inventory_2', role: 'admin'},
    {state: 'order', name: 'Manage Order', icon: 'shopping_cart', role: ''},
];

@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEMS;
    }
}