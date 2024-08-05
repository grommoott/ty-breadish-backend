import { Client, QueryResult } from "pg"

class BDClient {

    private _client: Client

    public query(query: string): Promise<QueryResult> {
        return this._client.query(query)
    }

    public end(): Promise<void> {
        return this._client.end()
    }

    constructor() {
        this._client = new Client({
            host: "aws-0-eu-central-1.pooler.supabase.com",
            user: "postgres.npjpkuowklkkpgevzgtf",
            password: "207d519bbb574a4e9b17d1a0a9495200",
            database: "postgres"
        })

        this._client.connect()
    }
}

export default new BDClient()
