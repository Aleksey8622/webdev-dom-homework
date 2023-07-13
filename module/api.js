const textElementsLoad = document.querySelector(".text-load");
textElementsLoad.style.display = "block"

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

