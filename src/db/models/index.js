import Article from "./article.js";
import User from "./user.js";
import Review from "./review.js";
import Category from "./category.js";
import ArticleCategory from "./ArticleCategory.js";

//defining relationship
// 1. what methods to use? hasMany, belongsTo
// 2. pick method and undersatnd TRAGET & SOURCE model
// 3. on the the other method switch TARGET & SOURCE model

Article.belongsTo(User, { onDelete: "CASCADE" }); // allows to include User on Article
User.hasMany(Article, { onDelete: "CASCADE" }); // allows to include Article in User

Article.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Article, { onDelete: "CASCADE" });

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

Article.belongsToMany(Category, { through: ArticleCategory });
Category.belongsToMany(Article, { through: ArticleCategory });

// If you want ID as a primary key

// Category.belongsToMany(Article, {
//   through: { model: ArticleCategory, unique: false },   /// to remove default COMPOSED PRIMARY KEY (categoryId, articleID)
// });
// Article.belongsToMany(Category, {
//   through: { model: ArticleCategory, unique: false },
// });

export { Article, User, Review, Category, ArticleCategory };
