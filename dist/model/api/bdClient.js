import { Client } from "pg";
class BDClient {
    query(query) {
        return this._client.query(query);
    }
    constructor() {
        this._client = new Client({
            host: "aws-0-eu-central-1.pooler.supabase.com",
            user: "postgres.npjpkuowklkkpgevzgtf",
            password: "207d519bbb574a4e9b17d1a0a9495200",
            database: "postgres"
        });
    }
}
export default new BDClient();
