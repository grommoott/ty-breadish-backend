import axios from "axios";
import config from "../../config";
import { Bundle } from "typescript";

class MapsApi {
    public async getTile(x: number, y: number, z: number): Promise<Bundle | Error> {
        try {
            const response = await axios.get(`https://api.maptiler.com/maps/streets-v2/256/${z}/${x}/${y}.png?key=${config.maptilerApiKey}`, { responseType: "arraybuffer" })

            return response.data
        } catch (e) {
            const msg = "Error in getTile request: " + e
            return new Error(msg)
        }
    }
}

const mapsApi = new MapsApi()

export { mapsApi }
