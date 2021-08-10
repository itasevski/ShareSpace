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
    }
    // fetchUser: (token) => {
    //     return AxiosShareSpace.get("/api/users/find/34da315c-3051-48eb-97b8-6c14a919d0db", {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     });
    // }
}

export default ShareSpaceService;