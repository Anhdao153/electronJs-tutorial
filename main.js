
const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

// If development environment
// if (env === 'development') {
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
})
// }

const windowStateKeeper = require('electron-window-state')
// const colors = require('colors')
// include the Node.js 'path' module at the top of your file
// const path = require('path')

// const bcrypt = require('bcrypt')
// bcrypt.hash('myPlaintextPassword', 10, (err, has) => {
//   console.log(err)
//   console.log(colors.rainbow(has))
// })
let win

ipcMain.on('new-item', (e, itemUrl) => {
  // console.log(e)
  // console.log(itemUrl)
  setTimeout(() => {
    e.sender.send('new-item-success', 'New item from main process')
  }, 2000)
})

// let win2
// modify your existing createWindow() function
const createWindow = () => {
  // window state manager
  const winState = windowStateKeeper({
    defaultHeight: 800, defaultWidth: 600
  })
  // const ses = session.defaultSession
  // ses.cookies.get({}).then((cookies) => {
  //   console.log(cookies)
  // }).catch((err) => {
  //   console.log(err)
  // })
  win = new BrowserWindow({
    x: winState.x,
    y: winState.y,
    width: winState.width,
    height: winState.height,
    minWidth: 350,
    // maxWidth: 1456,
    // maxHeight: 881,
    minHeight: 300,
    // frame: true,
    // titleBarStyle: 'hidden',
    // frame: false,
    webPreferences: {
      contextIsolation: false,
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile('./renderer/main.html')
  winState.manage(win)
  // win2.loadFile('./renderer/main.html')
  // win.loadURL('https://www.youtube.com/watch?v=oF-sBtY8NXo&list=RDMMoF-sBtY8NXo&start_radio=1')
  win.webContents.openDevTools()
  // win2.webContents.openDevTools()
  // win2.loadFile('index.html')
  // const wc = win.webContents

  // wc.on('new-window', (e, url) => {
  //   console.log(`create new  for ${url}`)
  // })
  // win.loadURL('https://httpbin.org/basic-auth/user/passwd')

  // wc.on('context-menu', (e, params) => {
  //   console.log(`content menu opened on : ${params.mediaType}, ${params.x}, ${params.y}`)
  //   console.log(`User selected text : ${params.selectionText}`)
  //   console.log(`Selection can be copied : ${params.editFlags.canCopy}`)
  //   const selectedTexty = params.selectionText
  //   wc.executeJavaScript(`alert ${selectedTexty}`)
  // })
  // wc.on('media-started-playing', () => {
  //   console.log(' Video started')
  // })
  // wc.on('media-paused', () => {
  //   console.log(' Video paused')
  // })

  // wc.on('login', (e, request, authInfo, callback) => {
  //   console.log('logging in:')
  //   callback('user', 'passwd')
  // })

  // wc.on('did-navigate', (e, url, statusCode, message) => {
  //   console.log(`Navigated ${url}`)
  //   console.log(statusCode, message)
  // })
  // wc.on('before-input-event', (e, input) => {
  //   console.log(`${input.key}: ${input.type}`)
  // })
  // wc.on('did-finish-load', () => {
  //   console.log('content fully loaded')
  // })

  // wc.on('dom-ready', () => {
  //   console.log('DOM Ready')
  // })
  // setTimeout(() => {
  //   win2.show()
  //   setTimeout(() => {
  //     win2.close()
  //     win2 = null
  //   }, 3000)
  // }, 2000)

  // only for windows
  win.on('closed', () => {
    win = null
  })
  // win2.on('closed', () => {
  //   win = null
  // })
}

// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow()
//     }
//   })
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (win === null) createWindow()
})
