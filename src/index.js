const { app, BrowserWindow, ipcMain } = require('electron')
const ipc = ipcMain

const createWindow = () => {
  const win = new BrowserWindow({
    minHeight:400,
    minWidth:400,
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    moveable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,

    }
  })
  win.loadFile('src/index.html')
  console.log("load")

  ipc.on('closeApp', ()=>{
    win.close();
  })

  ipc.on('min', ()=>{
    win.restore();
  })
  ipc.on('max', ()=>{
    win.maximize();
  })
  ipc.on('minus', ()=>{
    win.minimize();
  })

}

try {
  require('electron-reloader')(module)
} catch (_) {}

app.whenReady().then(() => {
  createWindow()
})
