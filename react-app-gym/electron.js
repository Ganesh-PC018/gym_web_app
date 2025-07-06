const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let springProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  // Load React build
  win.loadFile('build/index.html');
}

app.whenReady().then(() => {
  // 🟡 Start Spring Boot JAR in background
  springProcess = spawn('java', ['-jar', 'backend/yourapp.jar'], {
    cwd: __dirname,
    detached: true,
    stdio: 'ignore'
  });

  springProcess.unref(); // Keep backend running

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
