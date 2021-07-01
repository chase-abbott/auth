import pool from '../utils/pool.js';

export default class Popular{
  postId;
  userId;
  caption;
  photoUrl;
  tags;
  numberOfComments;

  constructor(row){
    this.postId = row.post_id;
    this.userId = row.user_id;
    this.caption = row.caption;
    this.photoUrl = row.photo_url;
    this.tags = row.tags;
    this.numberOfComments = row.number_of_comments;
  }

  static async getPopular(){
    const { rows } = await pool.query(`
    SELECT posts.post_id, user_id, caption, photo_url, tags, COUNT(comments.comment_id) AS number_of_comments FROM posts
    INNER JOIN comments
    ON posts.post_id = comments.post_id
    GROUP BY posts.post_id
    ORDER BY number_of_comments DESC
    LIMIT 10`);

    return rows.map(item => new Popular(item));
  }
}
