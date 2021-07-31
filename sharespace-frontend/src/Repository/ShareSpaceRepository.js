import AxiosHttpClient from "../Utilities/AxiosHttpClient/AxiosHttpClient";

const ShareSpaceRepository = {
    fetchGeolocationData: (lat, lng) => {
        return AxiosHttpClient.get(`/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`);
    }
}

export default ShareSpaceRepository;