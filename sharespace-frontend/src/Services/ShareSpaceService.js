import AxiosShareSpace from "../Utilities/AxiosHttpClient/AxiosShareSpace/AxiosShareSpace";

const ShareSpaceService = {
    login: (username, password) => {
        return AxiosShareSpace.post("/login", {
            "username": username,
            "password": password,
        });
    },
    register: (firstName, lastName, email, phoneNumber, username, password, confirmPassword, type) => {
        return AxiosShareSpace.post("/api/auth/register", {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phoneNumber": phoneNumber,
            "username": username,
            "password": password,
            "confirmPassword": confirmPassword,
            "type": type
        });
    },
    fetchCurrentUser: (token, username) => {
        return AxiosShareSpace.get(`/api/users/find-username/${username}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    updateCurrentUser: (token, id, firstName, lastName, phoneNumber, bio, facebookLink, twitterLink, instagramLink, type, vehicleModel) => {
        return AxiosShareSpace.post(`/api/users/update/${id}`, {
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "bio": bio,
            "facebookLink": facebookLink,
            "twitterLink": twitterLink,
            "instagramLink": instagramLink,
            "type": type,
            "vehicleModel": vehicleModel
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    }
}

export default ShareSpaceService;