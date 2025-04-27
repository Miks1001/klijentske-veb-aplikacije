import { OrderModel } from "./order.model"

export interface UserModel {
    email: string
    password: string
    first_name: string
    last_name: string
    phone: string
    address: string
    favouriteGenre: string
    orders: OrderModel[]
}