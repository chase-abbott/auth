DROP TABLE IF EXISTS users,
posts;
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);
CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  caption TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  tags TEXT [] NOT NULL
);