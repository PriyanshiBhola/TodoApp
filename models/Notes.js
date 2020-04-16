module.exports = (db, Sequelize) => {
  const Notes = db.define('notes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement : true,
    },
    note: {
      type: Sequelize.STRING(5000)
    },
    taskId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id'
      }
    }
  }, {});

  Notes.associate = ({ notes, tasks }) => {
    tasks.hasMany(notes);
    notes.belongsTo(tasks);
  };

  return Notes;
};
