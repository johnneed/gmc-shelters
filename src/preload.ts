import {contextBridge, ipcRenderer} from "electron";

const validChannels = [
    "READ_SHELTERS",
    "OPEN_IN_DEFAULT_BROWSER",
    "UPDATE_SHELTER",
    "DELETE_SHELTER",
    "CREATE_SHELTER",
    "READ_CATEGORIES",
    "READ_ARCHITECTURES",
    "ADD_AKA",
    "REMOVE_AKA",
    "UPDATE_AKA",
    "ADD_ARCHITECTURE",
    "REMOVE_ARCHITECTURE",
    "UPDATE_ARCHITECTURE",
    "ADD_CATEGORY",
    "REMOVE_CATEGORY",
    "UPDATE_CATEGORY"
];

contextBridge.exposeInMainWorld(
    "api", {
        invoke: (channel: string, data: any) => {
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, data);
            }
        },
    }
);
