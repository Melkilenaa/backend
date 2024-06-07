import mssql from 'mssql'
import { sqlConfig } from '../config/sqlConfig'

export default class Connection{


    static async execute(procedureName:string, data:{[c:string |number]: string |number}) {
        const pool =mssql.connect(sqlConfig) as Promise<mssql.ConnectionPool>

        let request =((await pool). request()) as mssql.Request

        for (let key in data){
            request.input(key, data[key])

        }
        const result = await request.execute(procedureName)

        return result
    }


}