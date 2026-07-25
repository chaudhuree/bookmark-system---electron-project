const { app, BrowserWindow } = require("electron");
const path = require("path");
const windowStateKeeper = require("electron-window-state");

let mainWindow;

function createWindow() {
    const winState = windowStateKeeper({
        defaultWidth: 500,
        defaultHeight: 650,
    });

    mainWindow = new BrowserWindow({
        width: winState.width,
        height: winState.height,
        x: winState.x,
        y: winState.y,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    // Automatically saves and restores window size/position
    winState.manage(mainWindow);

    // Load renderer HTML file
    mainWindow.loadFile(
        path.join(__dirname, "renderer", "main.html")
    );

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});