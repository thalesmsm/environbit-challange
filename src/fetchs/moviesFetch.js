import axios from 'axios';

export default async function getMovies() {
  try {
    const data = await axios
      .get('/db/movies.json')
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
    return data;
  } catch (error) {
    console.log(error);
  }
}
