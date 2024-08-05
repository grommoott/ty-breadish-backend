"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class BDClient {
    _client;
    query(query) {
        return this._client.query(query);
    }
    end() {
        return this._client.end();
    }
    constructor() {
        this._client = new pg_1.Client({
            host: "aws-0-eu-central-1.pooler.supabase.com",
            user: "postgres.npjpkuowklkkpgevzgtf",
            password: "207d519bbb574a4e9b17d1a0a9495200",
            database: "postgres"
        });
        this._client.connect();
    }
}
exports.default = new BDClient();
