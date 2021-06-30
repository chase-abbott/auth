import pool from '../utils/pool.js';

export default class Post {
  id;
  userId;
  caption;
  photoUrl;
  tags;

  constructor(row){
    this.id = row.id;
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
}