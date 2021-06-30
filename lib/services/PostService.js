import Post from '../models/Post.js';

export default class PostService {
  static async create(body){
    return Post.insert(body);
  }
}
