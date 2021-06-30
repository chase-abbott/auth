import pool from '../utils/pool.js';

export default class Post {
  id;
  user;
  caption;
  photoUrl;
  tags;

  constructor(row){
    this.id = row.id;
    this.user = row.email;
    this.caption = row.caption;
    this.photoUrl = row.photo_url;
    this.tags = row.tags;
  }

  static async insert(body){
    const { rows } = await pool.query(
      'INSERT INTO posts (email, caption, photo_url, tags) VALUES ($1, $2, $3, $4) RETURNING *'
      , [body.user, body.caption, body.photoUrl, body.tags]
    );

    return new Post(rows[0]);
  }
}
