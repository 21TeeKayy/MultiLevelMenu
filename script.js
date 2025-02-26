﻿let menuData = [];
let currentPath = [];
let cursorActive = false;

async function loadMenu() {
    const response = await fetch("menu.json");
    menuData = await response.json();
    showMenu(menuData.menu_options);
}

function activateCursor() {
    if (!cursorActive) {
        document.getElementById("cursor").setAttribute("raycaster", "objects: .clickable");
        cursorActive = true;
    }
}

function showMenu(options) {
    const scene = document.getElementById("menu-container");
    scene.innerHTML = "";

    options.forEach((option, index) => {
        const x = (index % 3) * 3 - 3;
        const y = Math.floor(index / 3) * -3 + 2;

        let shape = option.level === 0 ? "a-box" : option.level === 1 ? "a-sphere" : "a-cylinder";

        const entity = document.createElement(shape);
        entity.setAttribute("position", `${x} ${y} -4`);
        entity.setAttribute("color", option.color);
        entity.setAttribute("class", "clickable");

        entity.addEventListener("click", () => {
            if (cursorActive) {
                navigateMenu(option);
            }
        });

        const text = document.createElement("a-text");
        text.setAttribute("value", option.name);
        text.setAttribute("align", "center");
        text.setAttribute("position", `${x} ${y + 1.2} -4`);
        text.setAttribute("color", "black");
        text.setAttribute("width", "4");

        scene.appendChild(entity);
        scene.appendChild(text);
    });

    document.getElementById("back-button").style.display = currentPath.length ? "block" : "none";
    document.getElementById("menu-path").textContent = getPathText();
}

function navigateMenu(option) {
    if (option.options) {
        currentPath.push(option);
        showMenu(option.options);
    } else {
        showSingleItem(option);
    }
}

function showSingleItem(option) {
    const scene = document.getElementById("menu-container");
    scene.innerHTML = "";

    const entity = document.createElement("a-cylinder");
    entity.setAttribute("position", "0 1 -4");
    entity.setAttribute("color", option.color);
    entity.setAttribute("radius", "1");
    entity.setAttribute("height", "2");

    const text = document.createElement("a-text");
    text.setAttribute("align", "center");
    text.setAttribute("position", "0 2.5 -4");
    text.setAttribute("color", "black");
    text.setAttribute("width", "4");

    scene.appendChild(entity);
    scene.appendChild(text);
    document.getElementById("menu-path").textContent = getPathText();
    document.getElementById("back-button").style.display = "block";
}

function goBack() {
    currentPath.pop();
    const lastLevel = currentPath.length ? currentPath[currentPath.length - 1].options : menuData.menu_options;
    showMenu(lastLevel);
}

function getPathText() {
    return currentPath.map(o => o.name).join(" / ") || "Главное меню";
}

window.onload = loadMenu;
