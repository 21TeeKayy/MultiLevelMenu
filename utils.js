function saveMenu() {
    const dataStr = JSON.stringify(menuData, null, 4);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "menu.json";
    a.click();
}
