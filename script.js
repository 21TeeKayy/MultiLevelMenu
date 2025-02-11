let menuData = [];
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
        const x = (index % 3) * 3 - 3; // Размещение в сетке по 3 объекта в ряд
        const y = Math.floor(index / 3) * -3 + 1;

        const entity = document.createElement("a-box");
        entity.setAttribute("position", `${x} ${y} -4`);
        entity.setAttribute("color", option.color);
        entity.setAttribute("depth", "1");
        entity.setAttribute("width", "1");
        entity.setAttribute("height", "1");
        entity.setAttribute("class", "clickable");

        // Обработчик клика
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
        alert("Вы выбрали: " + option.name);
    }
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
