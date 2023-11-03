const sql = require('mssql')

async () => {
    try {
        await sql.connect('Server=mssqlstud.fhict.local;Database=dbi512957_globalearn;User Id=dbi512957_globalearn;Password=admin;')
    }
    catch (err) {
        
    }
}