export const TMBD_CONFIG = {
  baseUrl: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query: string}) => {
    const endpoint = query
    ? `${TMBD_CONFIG.baseUrl}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMBD_CONFIG.baseUrl}/discover/movie?sort_by=popularity.desc`

    const response = await fetch (endpoint, {
        method: 'GET',
        headers: TMBD_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Error fetching movies`);
    }

    const data = await response.json(); 

    return data.results; 
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2YxMWQ1YmMxY2RjN2M0ZGUzOGY0NGQ3NzQ4NmJiOSIsIm5iZiI6MTY5ODUzMDc0MS45NzQwMDAyLCJzdWIiOiI2NTNkODViNWM4YTVhYzAwYWQzNzM4Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OxvFAh7JyAz6Uwci8BWYHRpaiO91u9ntHkJjWQ-tqPU'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));