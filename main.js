const { app, BrowserWindow, ipcMain } = require("electron");
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

    // devTool opne
    mainWindow.webContents.openDevTools();

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

// listen fro data from the ui
ipcMain.on('new-item', (e, itemUrl) => {
    console.log(itemUrl)
    setTimeout(() => {
        e.sender.send('new-item-success', itemUrl)
    }, 2000)
})




app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

