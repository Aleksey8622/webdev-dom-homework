"use strict";

import { renderStart } from "./renderStart.js";
import { currentDate } from "./helpers.js";

const textElementsLoad = document.querySelector(".text-load");
textElementsLoad.style.display = "block";

// renderLogin({ addedComments });
// renderChangingMarkup({})
const url = "https://wedev-api.sky.pro/api/v2/Aleksey-Rudnev/comments";
export const startPage = () => {
    return fetch(url, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            textElementsLoad.style.display = "none";
            return response;
        })
        .then((responseCommets) => {
            const massComments = responseCommets.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: currentDate(new Date(comment.date)),
                    text: comment.text,
                    likes: comment.likes,
                    islover: false,
                    isEdit: false,
                };
            });

            console.log(massComments);
            renderStart({ massComments })

            // console.log(arrayOfComments);
        })
        .catch((error) => {
            alert("Кажется, у вас сломался интернет");
            console.error(error);
        });
};
startPage()