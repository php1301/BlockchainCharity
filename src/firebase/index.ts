import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Initialize Firebase
const environment = {
    firebase: {
        apiKey: "AIzaSyC0I6nzs1_Xpqcfgtdnbrxvoevr_sJ6ooI",
        authDomain: "blockchaincharity-3dc53.firebaseapp.com",
        projectId: "blockchaincharity-3dc53",
        storageBucket: "blockchaincharity-3dc53.appspot.com",
        messagingSenderId: "812224590431",
        appId: "1:812224590431:web:d6902c5766457ab8cf21ea",
        measurementId: "G-WQ3E74D4PD",
    },
    production: false,
};
export const firebaseClient = initializeApp(environment.firebase);
if (firebaseClient.name && typeof window !== "undefined") {
    getAnalytics(firebaseClient);
}
