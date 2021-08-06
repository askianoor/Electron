const { app, BrowserWindow, ipcMain} = require('electron');

function createWindows() {
    let appWindow = new BrowserWindow({
        width: 600,
        height: 800,
        center: true,
        minWidth: 300,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    //appWindow.loadURL('https://askianoor.ir');
    appWindow.loadFile('./index.html');


    appWindow.on('closed', () => {
        appWindow = null;
    });

    let aboutWindow = new BrowserWindow({
        width: 300,
        height: 300,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        frame: false,
        // transparent: true
    });

    aboutWindow.loadFile('./about.html');

    appWindow.once('ready-to-show', () => {
        appWindow.maximize();
        appWindow.show();

        setTimeout(() => {
            aboutWindow.show();
            // setTimeout(() => {
            //     aboutWindow.hide();
            // }, 3000);
        }, 1000);
    });

    aboutWindow.on('closed', () => {
        aboutWindow = null;
    });

    ipcMain.on('closeInfoWindow', (event)=> {
        aboutWindow.hide();
    });
}

app.on('ready', createWindows);