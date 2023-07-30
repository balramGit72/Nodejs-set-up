import Post from "./post.js";
import User from "./user.js";

// Define the associations using the `associate` function
function associateModels() {
    // One-to-many association: User has many posts
    User.hasMany(Post, { as: 'posts' });
    // Many-to-one association: Post belongs to a user
    Post.belongsTo(User, { foreignKey: 'userId' });
  }
  

export default {
    User,
    Post,
    associateModels
}