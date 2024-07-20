import axios from "axios";

var axiosClient;
const baseURL = "http://localhost:3002/api";
function axiosConfigure() {    
    axiosClient = axios.create({
        baseURL: "http://localhost:3002/api/",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",           
        },
        timeout: 20000,
        withCredentials: false,
    });
}

export function getRequest(URL) {
    return new Promise((resolve, reject) => {
        axiosConfigure();
        return axiosClient
            .get(`/${URL}`)
            .then((response) => resolve(response?.data))
            .catch(({ response }) => reject(response?.data));
    });
}

export function postRequest(URL, payload, options) {
    return new Promise((resolve, reject) => {
        axiosConfigure(options);
        return axiosClient
            .post(`/${URL}`, payload)
            .then((response) => {
                resolve(response?.data);
            })
            .catch(({ response }) => reject(response?.data));
    });
}

