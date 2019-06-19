const { app, BrowserWindow } = require('electron')
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })

  // win.loadFile('../public/index.html')

  // win.loadURL('http://localhost:3000/')

  win.loadURL('https://event-management-web.herokuapp.com')

  // win.webContents.openDevTools()

}
app.on('ready', createWindow)
