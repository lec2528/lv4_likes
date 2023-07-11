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
        targetKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'userId',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'postId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'postId',
      });
      this.hasMany(models.Likes, {
        sourceKey: 'postId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'postId',
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
