import axios from 'axios';

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
class DataController {

    static async get(url){
        try {
            return await axios.get(url);
        } catch (error) {
            return [];
        }
    }

    static async getPosts(){
        return await this.get(POSTS_URL);
    }

    static async getUsers(){
        return await this.get(USERS_URL);
    }

    static async getComents(postId){
        return await this.get(`${POSTS_URL}/${postId}/comments`)
    }
}

export default DataController;