import { ProjectionModel } from "../models/projection.model";

export class ProjectionService {
    static getProjections(): ProjectionModel[] {
        return [
            {
                id: 1,
                type: '2D - Enjoy for lower price',
                price: 500
            },
            {
                id: 2,
                type: '3D - Sweet Spot',
                price: 1000
            },
            {
                id: 3,
                type: '4D - Best experience',
                price: 1200
            }
        ]
    }
    static getProjectionById(id: number) {
        return this.getProjections().find(projection => projection.id === id)
    }
}