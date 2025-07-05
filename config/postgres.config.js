import pg from "pg";
import settings from "#config/settings";

const PgPool = new pg.Pool({
   connectionString: settings.DB_CONNECTION_STRING
});

export default PgPool;