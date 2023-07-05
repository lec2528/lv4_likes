'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, {
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'userId',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'userId',
      });
    }
  }
  Users.init(
    {
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
