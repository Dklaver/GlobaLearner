const sql = require('mssql')

async () => {
    try {
        await sql.connect('Server=localhost;Database=u176939p223284_Globalearner;User Id=u176939p223284_Globalearner;Password=Dz5LYVn4Nm9SDj9WPGfP;')
    }
    catch (err) {
        
    }
}