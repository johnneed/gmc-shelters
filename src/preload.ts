// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

const  validChannels = ["READ_SHELTERS"];
contextBridge.exposeInMainWorld(
  "api", {
    invoke: (channel:string, data:any) => {
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
    },
  }
);
