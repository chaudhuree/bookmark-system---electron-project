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