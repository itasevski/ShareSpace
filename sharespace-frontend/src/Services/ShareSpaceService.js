import AxiosShareSpace from "../Utilities/AxiosHttpClient/AxiosShareSpace/AxiosShareSpace";

const ShareSpaceService = {
    login: (username, password) => {
        return AxiosShareSpace.post("/login", {
            "username": username,
            "password": password,
        });
    },
    register: (firstName, lastName, email, username, password, confirmPassword, userType) => {
        return AxiosShareSpace.post("/api/auth/register", {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "username": username,
            "password": password,
            "confirmPassword": confirmPassword,
            "userType": userType
        });
    },
    fetchUser: (token, uuid) => {
        return AxiosShareSpace.get(`/api/users/find/${uuid}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
}

export default ShareSpaceService;