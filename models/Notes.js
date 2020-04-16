module.exports = (db, Sequelize) => {
  const Notes = db.define('notes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement : true,
    },
    note: {
      type: Sequelize.STRING(5000)
    }
  }, {});

  Notes.associate = ({ notes, tasks }) => {
    tasks.hasMany(notes);
    notes.belongsTo(tasks);
  };

  return Notes;
};
