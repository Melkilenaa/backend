import mssql from 'mssql'
import { config } from '../config/sqlConfig'

export default class Connection{
    static async query(query:string){
        const pool = mssql.connect(config) as Promise<mssql.ConnectionPool>

        let request = ((await pool).request().query(query))

        return request
    }
    static async execute(procedureName: string, data: { [c: string | number]: string | number | Date }) {
        const pool = await mssql.connect(config) as mssql.ConnectionPool;
        let request = pool.request() as mssql.Request;
    
        for (let key in data) {
            let value = data[key];
            if (value instanceof Date) {
                value = value.toISOString();
            }
            
            request.input(key, value);
        }
        
        const result = await request.execute(procedureName);
        return result;
    }
    
}