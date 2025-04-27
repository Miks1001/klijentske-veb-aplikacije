import axios from "axios";
const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',  //base se ne mjenja
    headers: {
        'Accept': 'application/json',
        'X-Client-Name': 'KVA/2025'
    },
    validateStatus: (status: number) => {
        return status === 200
        // samo ako je 200 vrati response
        //u ostalim slucajevima baci izuzetak
    }

})


export class MovieService {
    static async getMovies(page: number = 0, size: number = 10) {
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'page': page,
                'size': size,
                'sort': 'startDate,asc',
                'type': 'createdAt'
            }
        })
    }

    static async getMoviesById(id: number) {
        return axios.get(`/movie/${id}`)
    }
}




