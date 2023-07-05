'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'userId',
      });
      this.belongsTo(models.Posts, {
        sourceKey: 'postId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'postId',
      });
    }
  }
  Comments.init(
    {
      nickname: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Comments',
    }
  );
  return Comments;
};
