import pool from '../utils/pool.js';

const mungePosts = (arr) => {
  return arr.reduce((acc, post) => {
    
    const existingPost = acc.find(item => item.postId === post.postId);
    if(!existingPost) return [...acc, post];
  }, []);
};

export default class Popular{
  postId;
  userId;
  caption;
  photoUrl;
  tags;
  comments;

  constructor(row){
    this.postId = row.post_id;
    this.userId = row.user_id;
    this.caption = row.caption;
    this.photoUrl = row.photo_url;
    this.tags = row.tags;
    this.comments = [];
  }

  static async getPopular(){
    const { rows } = await pool.query(`
    SELECT * FROM posts
    LEFT JOIN comments
    ON posts.post_id = comments.post_id`);

    console.log(rows);

    return rows.map(item => new Popular(item));
  }
}
