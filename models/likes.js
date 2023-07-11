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
        targetKey: 'userId', //Users 모델의 userId를
        foreignKey: 'userId', //Likes 모델의 userId와 연결
      });
      this.belongsTo(models.Posts, {
        targetKey: 'postId', //Users 모델의 postId를
        foreignKey: 'postId', //Likes 모델의 postId 연결
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
