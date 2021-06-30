import pool from '../utils/pool.js';

export default class Comment {
  commentId;
  commentBy;
  postId;
  comment;

  constructor(row){
    this.commentId = row.comment_id;
    this.commentBy = row.comment_by;
    this.postId = row.post_id;
    this.comment = row.comment;
  }

  static async insert(email, { postId, comment }){
    const { rows } = await pool.query(`
    INSERT INTO comments (comment_by, post_id, comment) VALUES ($1, $2, $3) RETURNING *`
    , [email, postId, comment]);
    
    return new Comment(rows[0]);
  }

}
