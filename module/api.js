import { textElementsLoad } from "./main.js";


export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/Aleksey-Rudnev/comments", {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            textElementsLoad.style.display = "none"
            return response
        })
}



export const addTodo = (name, text) => {
    return fetch("https://wedev-api.sky.pro/api/v1/Aleksey-Rudnev/comments", {

        method: "POST",
        body: JSON.stringify({
            text: text
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            name: name
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            forceError: true
        })
    })
}



