const { BrowserWindow } = require("electron");

module.exports = async (url) => {

    const win = new BrowserWindow({
        show: false,
        width: 500,
        height: 500,
        webPreferences: {
            offscreen: true,
        },
    });

    try {
        // format url
        if (!url.includes('https')) {
            url = `https://${url}`
        }
        await win.loadURL(url);

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        const title = win.getTitle();

        const finalUrl =
            win.webContents.getURL();

        const image =
            await win.webContents.capturePage();

        const screenshot =
            image.toDataURL();

        return {
            success: true,
            title,
            url: finalUrl,
            screenshot
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    } finally {

        win.destroy();

    }

};

/*
const { BrowserWindow } = require("electron");

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const waitForLoad = (win, timeout = 15000) => {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("Page load timeout."));
        }, timeout);

        win.webContents.once("did-finish-load", () => {
            clearTimeout(timer);
            resolve();
        });
    });
};

module.exports = async (url) => {
    const win = new BrowserWindow({
        show: false,
        width: 1280,
        height: 720,
        webPreferences: {
            offscreen: true,
        },
    });

    try {
        // Start loading the page.
        win.loadURL(url);

        // Wait until Electron says the page has loaded.
        await waitForLoad(win);

        // Give JavaScript-heavy websites a little time to render.
        await delay(2000);

        // Capture the page.
        const image = await win.webContents.capturePage();

        return {
            success: true,
            title: win.getTitle(),
            url: win.webContents.getURL(),
            screenshot: image.toDataURL(),
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    } finally {
        if (!win.isDestroyed()) {
            win.destroy();
        }
    }
};
*/