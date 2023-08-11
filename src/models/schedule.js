'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Schedule có key là timeType map với Allcode với key là keyMap, trả lại data bên table Allcode dưới dạng là timeTypeData
      Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData' })


      //1 bác sĩ có thể đặt nhiều lịch làm, quan hệ 1-N
      Schedule.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'doctorData' })

    }
  };
  Schedule.init({
    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};