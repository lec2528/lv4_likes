'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
      this.belongsTo(models.Posts, {
        targetKey: 'postId',
        foreignKey: 'postId',
      });
    }
  }
  Likes.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Likes',
    }
  );
  return Likes;
};
