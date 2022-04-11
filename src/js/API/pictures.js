import axios from 'axios';

axios.defaults.baseURL= `https://62519cf22dc339451d3035f0.mockapi.io/`;
const BASE_URL = `https://62519cf22dc339451d3035f0.mockapi.io`;
let page = 1;
let limit = 10;

export async function getPics() {
    const params = new URLSearchParams({
        page: page,
        limit: limit,
    })
    try {
        const response = await axios.get(`pictures?${params}`);
        // console.log(response.data);
        page++;
        return response.data;
    }
    catch (error) {
        throw Error(`Error: ${error.status}`)
    }

}


// export function getPics() {
//     const params = new URLSearchParams({
//         page: page,
//         limit: limit,
//     })
    
//     return fetch(`${BASE_URL}/pictures?${params}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw Error(`Error: ${error.status}`)
//             }
//             return response.json();
//         })
//         .then(pictures => {
//             page++;
//             return {
//                 pictures,
//                 hasNextPage: page <= totalPosts,
//             }
//     })
// }