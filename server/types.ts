export interface User {
    id:string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password:string;
}

export interface Post {
    id:string;
    title:string;
    url:string;
    userId:string;
    postedAt:number;
}

export interface Like{
    userId:string;
    posrId:string;
}

export interface Comment{
    id:string;
    userId:string;
    postId:string;
    content:string;
    postedAt:number;
}