const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/test.db'
})
const Notes = db.define('notes',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
    note : {
        type : Sequelize.STRING(5000)
    }
})

const Tasks =db.define('tasks',
{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    title :
    {
        type : Sequelize.STRING(100),
        allowNull : false
    },
    description :
    {
        type : Sequelize.STRING(250)
    },
    due_date : 
    {
        type : Sequelize.DATEONLY,
        allownull : false
    },
    status : {
        type : Sequelize.BOOLEAN,
        defaultValue : true
    },
    priority:
    {
    type : Sequelize.ENUM,
    values : ['high', 'medium', 'low'],
    defaultValue : true,
    allowNull : false

    },

})

Tasks.hasMany(Notes);
Notes.belongsTo(Tasks);
   
module.exports = {
    db, Tasks, Notes
}
    

