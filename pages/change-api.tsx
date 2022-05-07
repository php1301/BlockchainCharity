import React from "react";
import styles from "../src/styles/Home.module.css";
import { setCookies } from 'cookies-next';

export default function ChangeApi() {
    const onSubmit = (e) => {
        e.preventDefault();
        const value = (document.getElementsByName("change-api")[0] as any)
            .value;
        console.log(value);
        setCookies("base", value);
    };
    return (
        <main className={styles.main}>
            <form onSubmit={onSubmit}>
                <input style={{ border: "3px solid" }} name="change-api" />
                <button style={{ border: "3px solid" }} type="submit">
                    Change api
                </button>
            </form>
        </main>
    );
}
