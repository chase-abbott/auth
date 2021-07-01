import pool from '../utils/pool.js';

export default class Post {
  postId;
  userId;
  caption;
  photoUrl;
  tags;

  constructor(row){
    this.postId = row.post_id;
    this.userId = row.user_id;
    this.caption = row.caption;
    this.photoUrl = row.photo_url;
    this.tags = row.tags;
  }

  static async insert({ userId, caption, photoUrl, tags }){
    const { rows } = await pool.query(
      'INSERT INTO posts (user_id, caption, photo_url, tags) VALUES ($1, $2, $3, $4) RETURNING *'
      , [userId, caption, photoUrl, tags]
    );

    return new Post(rows[0]);
  }

  static async selectAll(){
    const { rows } = await pool.query(`
    SELECT * FROM posts`);

    return rows.map(post => new Post(post));
  }

  static async selectById(id){

    const { rows } = await pool.query(`
    SELECT posts.post_id, caption, photo_url, tags, email, comment, comment_id FROM posts
    INNER JOIN users
    ON posts.user_id = users.user_id
    INNER JOIN comments
    ON posts.post_id = comments.post_id
    WHERE posts.post_id = $1`
    , [id]);
   
    
    const post = new Post(rows[0]);
    post.email = rows[0].email;
    const comments = rows.map(item => {
      return {
        commentId: item.comment_id,
        comment: item.comment
      };
    });
    
    post.comments = comments;
    return post;
  }

  static async updatePost({ caption }, paramId, userId){
    const { rows } = await pool.query(`
    UPDATE posts
    SET caption = $1
    WHERE post_id = $2 AND user_id = $3
    RETURNING *`
    , [caption, paramId, userId]);
    
    return new Post(rows[0]);
  }

  static async deletePost(userId, paramsId){
    const { rows } = await pool.query(`
    DELETE FROM posts
    WHERE user_id = $1 AND post_id = $2
    RETURNING *`,
    [userId, paramsId]);

    return new Post(rows[0]);
  }
}
