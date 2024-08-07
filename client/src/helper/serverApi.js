import axios from 'axios'

const serverApi = axios.create({
    baseURL: 'https://foodies.arlia.space'
  });

export default serverApi