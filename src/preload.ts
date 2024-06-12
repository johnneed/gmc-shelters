// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";


contextBridge.exposeInMainWorld("api", {
  "foobar": () => {
    console.log("FOOBAR");
  },
  "doThings": (arg: string) => ipcRenderer.send("do-a-thing", arg)
});
