import { ProjectionModel } from "./projection.model"

export interface OrderModel {
    id: number
    movieId: number
    title: string
    description: string
    genre: string[]
    runTime: number
    director: string
    actors: string[]
    startDate: string
    pricePerItem: number
    reserveDate: string
    status: 'rezervisano' | 'gledano' | 'otkazano'
    rating: null | number
    numberOfTickets: number
    projection: string
    isVip: boolean
}