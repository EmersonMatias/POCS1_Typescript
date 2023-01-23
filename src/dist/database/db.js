import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
var Pool = pg.Pool;
var connection = new Pool({
    connectionString: "postgres://xffistfp:aUh5eYF_vPMjOJgmyVaLD-uIDzTfGP_6@babar.db.elephantsql.com/xffistfp"
});
console.log("DB connected");
export default connection;
