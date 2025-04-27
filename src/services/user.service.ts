import { OrderModel } from "../models/order.model"
import { UserModel } from "../models/user.model"

export class UtilsService {

    static retriveUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    email: 'user@example.com',
                    first_name: 'test',
                    last_name: 'test',
                    phone: '+3816123456789',
                    address: 'Nemanjina 1, Savski Venac',
                    favouriteGenre: 'Triler',
                    password: 'test123',
                    orders: []
                }
            ]
            localStorage.setItem('user', JSON.stringify(arr))
        }
        return JSON.parse(localStorage.getItem('users')!)
    }


    static getActiveUser(): UserModel | null {
        if (!localStorage.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.email == localStorage.getItem('active')) {
                return user
            }
        }

        return null
    }
    static login(email: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.email === email && user.password === password) {
                localStorage.setItem('active', user.email)
                return true
            }
        }
        return false
    }

    static createUser(model: UserModel) {
        const users = this.retrieveUsers()
        for (let user of users) {
            if (user.email === model.email) {
                return false
            }
        }
        users.push(model)
        localStorage.setItem('users', JSON.stringify(users))
        return true
    }

    static createOrder(order: OrderModel) {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.orders.push(order)
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }
        return false
    }

    static changePassword(pass: string): boolean {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.password = pass
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }
        return false
    }
    static updateUser(model: UserModel) {
        const users = this.retrieveUsers()
        for (let user of users) {
            if (user.email === model.email) {
                user.first_name = model.first_name
                user.last_name = model.last_name
                user.address = model.address
                user.phone = model.phone
                user.favouriteGenre = model.favouriteGenre
            }
        }
        localStorage.setItem('users', JSON.stringify(users))
    }

    static changeOrderStatus(state: 'rezervisano' | 'gledano' | 'otkazano', id: number) {
        const active = this.getActiveUser()

        if (active) {
            const arr = this.retrieveUsers()
            for (let user of arr) {
                if (user.email == active.email) {
                    for (let order of user.orders) {
                        if (order.id == id) {
                            order.status = state
                        }
                    }
                    localStorage.setItem('users', JSON.stringify(arr))
                    return true
                }
            }
        }
        return false
    }

    static changeRating(r: number, id: number) {
        const active = this.getActiveUser()
        if (active) {
            const arr = this.retrieveUsers()
            for (let user of arr) {
                if (user.email == active.email) {
                    for (let order of user.orders) {

                        if (order.id == id && order.status == 'gledano') {
                            order.rating = r
                        }
                    }

                    localStorage.setItem('users', JSON.stringify(arr))
                    return true
                }
            }
        }
        return false
    }
}