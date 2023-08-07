"use strict";
import { addedComments } from "./api.js";
import { renderLogin } from "./loginPage.js";


const textElementsLoad = document.querySelector(".text-load");
textElementsLoad.style.display = "block";

renderLogin({ addedComments });

