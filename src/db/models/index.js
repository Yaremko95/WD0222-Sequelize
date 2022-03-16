import Article from "./article.js";
import User from "./user.js";

//defining relationship
// 1. what methods to use? hasMany, belongsTo
// 2. pick method and undersatnd TRAGET & SOURCE model
// 3. on the the other method switch TARGET & SOURCE model

Article.belongsTo(User, { onDelete: "CASCADE" });
User.hasMany(Article, { onDelete: "CASCADE" });

export default {
  Article,
  User,
};
