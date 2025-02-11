﻿let menuData = [];
let currentPath = [];
let currentOptions = [];

async function loadMenu() {
    const response = await fetch("menu.json");
    menuData = await response.json();
    showMenu(menuData.menu_options);
}

function showMenu(options) {
    const scene = document.getElementById("menu-container");
    scene.innerHTML = ""; // Очистка сцены перед обновлением

    options.forEach((option, index) => {
        const x = (index % 3) * 3 - 3; // Размещение в сетке
        const y = Math.floor(index / 3) * -3 + 1;

        // Выбираем форму в зависимости от уровня
        let shape;
        if (option.level === 0) shape = "a-box";
        else if (option.level === 1) shape = "a-sphere";
        else shape = "a-cylinder";

        const entity = document.createElement(shape);
        entity.setAttribute("position", `${x} ${y} -4`);
        entity.setAttribute("color", option.color);
        entity.setAttribute("depth", "1");
        entity.setAttribute("width", "1");
        entity.setAttribute("height", "1");
        entity.setAttribute("radius", "0.7");
        entity.setAttribute("class", "clickable");

        // Добавляем обработчик клика
        entity.addEventListener("click", () => navigateMenu(option));

        // Добавляем текстовую метку
        const text = document.createElement("a-text");
        text.setAttribute("value", option.name);
        text.setAttribute("align", "center");
        text.setAttribute("position", `${x} ${y + 1.5} -4`);
        text.setAttribute("color", "black");
        text.setAttribute("width", "2");

        scene.appendChild(entity);
        scene.appendChild(text);
    });

    document.getElementById("back-button").style.display = currentPath.length ? "block" : "none";
    document.getElementById("menu-path").textContent = getPathText();
    currentOptions = options;
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

    // Добавляем текстовое название предмета
    const text = document.createElement("a-text");
    text.setAttribute("value", option.name);
    text.setAttribute("align", "center");
    text.setAttribute("position", `0 2.5 -4`);
    text.setAttribute("color", "black");
    text.setAttribute("width", "2");

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
