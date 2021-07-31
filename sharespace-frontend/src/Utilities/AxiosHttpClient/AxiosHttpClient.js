import axios from "axios";

const AxiosHttpClient = axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/geocode`
});

export default AxiosHttpClient;