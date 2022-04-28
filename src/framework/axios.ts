import axios from "axios";
// import queryString from "query-string";
import { getAuth, getIdToken } from "firebase/auth";

const getFirebaseToken = async () => {
    const currentUser = getAuth().currentUser;
    if (currentUser) return currentUser.getIdToken();

    // Not logged in
    const hasRememberedAccount = localStorage.getItem(
        "firebaseui::rememberedAccounts",
    );
    if (!hasRememberedAccount) return null;
};

// Set up default config for http requests here
const baseUrl = "http://localhost:3000/dev";
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "content-type": "application/json",
    },
    // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = await getFirebaseToken();

    if (token) {
        console.log("token refresh", token)
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
