import { Coords } from "@primitives"
import axios from "axios"
import config from "../../config"

class GeocodingApi {
    public async fromCoords(coords: Coords): Promise<string | Error> {
        try {
            const response = await axios.get(`https://api.maptiler.com/geocoding/${coords.longitude},${coords.latitude}.json?key=${config.maptilerApiKey}`)
            const features = Array.from(response.data.features)

            if (features.length == 0) {
                return ""
            } else {
                return (features[0] as any).place_name
            }

        } catch (e) {
            const msg = "Error in fromCoords request: " + e
            return new Error(msg)
        }
    }

    public async fromQuery(query: string): Promise<Array<Coords> | Error> {
        try {
            const response = await axios.get(`https://api.maptiler.com/geocoding/${query}.json?key=${config.maptilerApiKey}`)
            const features = Array.from(response.data.features)

            return features.map((feature: any) => Coords.fromObject(feature.coordinates))
        } catch (e) {
            const msg = "Error in fromQuery request: " + e
            return new Error(msg)
        }
    }
}

const geocodingApi = new GeocodingApi()

export { geocodingApi }
