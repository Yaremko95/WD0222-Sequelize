import Article from "./article.js";
import User from "./user.js";

//defining relationship
// 1. what methods to use? hasMany, belongsTo
// 2. pick method and undersatnd TRAGET & SOURCE model
// 3. on the the other method switch TARGET & SOURCE model

Article.belongsTo(User, { onDelete: "CASCADE" }); // allows to include User on Article
User.hasMany(Article, { onDelete: "CASCADE" }); // allows to include Article in User

export { Article, User };
