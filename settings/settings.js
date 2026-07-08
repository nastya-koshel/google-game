import {GridSettings} from "./gridSettings.js";
import {GoogleSettings} from "./googleSettings.js";

export class Settings {
    constructor() {
        this.gridSize = new GridSettings (4,4);
        this.google = new GoogleSettings(1000, 5)
    }
}