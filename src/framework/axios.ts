import axios from "axios";
// import queryString from "query-string";
import { getAuth } from "firebase/auth";
import { getCookie, setCookies } from "cookies-next";
import { firebaseClient } from "src/firebase";

const getFirebaseToken = async () => {
    const currentUser = getAuth(firebaseClient).currentUser;
    if (currentUser) {
        const token = await currentUser.getIdToken();
        setCookies("token", token);
    }

    // Not logged in
    return null;
};

// Set up default config for http requests here
const baseUrl = getCookie("base")?.toString() || "https://b654-113-177-113-150.ngrok.io/dev";
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "content-type": "application/json",
    },
    // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    await getFirebaseToken();
    const token = getCookie("token")?.toString();
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token ? token : ""}`,
        };
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

export default axiosClient;
