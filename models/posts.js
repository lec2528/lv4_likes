'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: 'userId', // Users 모델의 userId 컬럼을
        foreignKey: 'userId', // Posts의 userId 컬럼과 연결
      });
      this.hasMany(models.Comments, {
        sourceKey: 'postId', // Posts 모델의 postId 컬럼을
        foreignKey: 'postId', // Comments 모델의 postId 컬럼과 연결
      });
      this.hasMany(models.Likes, {
        sourceKey: 'postId', // Posts 모델의 postId와 컬럼을
        foreignKey: 'postId', // Likes 모델의 postId와 연결
      });
    }
  }
  Posts.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      nickname: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      like: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Posts',
    }
  );
  return Posts;
};
