module.exports = (db, Sequelize) => {
  const Tasks = db.define("tasks", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(250),
    },
    due_date: {
      type: Sequelize.DATEONLY,
      allownull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    priority: {
      type: Sequelize.ENUM,
      values: ["high", "medium", "low"],
      defaultValue: true,
      allowNull: false,
    },
  }, {});

  Tasks.associate = () => {};

  return Tasks;
};
