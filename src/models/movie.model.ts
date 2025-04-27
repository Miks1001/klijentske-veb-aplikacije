
export interface MovieModel {
    movieId: number
    internalId: string
    corporateId: string
    directorId: string
    title: string
    originalTitle: string
    description: string
    shortDescription: string
    poster: string
    startDate: string
    shortUrl: string
    runTime: number
    createdAt: string
    updatedAt: null | string

    director: {
        directorId: number
        name: string
        createdAt: string
    }
    movieActors: {
        movieActorId: number
        movieId: number
        actorId: number
        actor: {
            actorId: number
            name: string
            createdAt: string
        }
    }[]

    movieGenre: {
        movieGenreId: number
        movieId: number
        genreId: number
        genre: {
            genreId: number
            name: string
            createdAt: string
        }
    }[]


}
