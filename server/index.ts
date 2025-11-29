import express from 'express';
import type { RequestHandler,Request,Response,NextFunction } from 'express';


const posts= [
        {id: 1, title: 'First Post', content: 'This is the content of the first post.'},
        {id: 2, title: 'Second Post', content: 'This is the content of the second post.'},
        {id: 3, title: 'Third Post', content: 'This is the content of the third post.'}
    ]

const app = express();
app.use(express.json());

const loggerMiddleware : RequestHandler= (req:Request , res :Response, next:NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
}
app.use((req:Request , res :Response, next:NextFunction)=>{
    console.log(Date.now());
    
})
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.status(200).json({message:'Hello, World!'});
});

app.get('/posts/list', (req, res) => {
    res.status(200).json({posts});
});

app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({message: 'Post not found'});
    }
    res.status(200).json({post});
});


app.post('/posts', (req, res) => {
    const body = req.body;
    const newPost = {
        id: posts.length + 1,
        title: body.title,
        content: body.content
    };
    posts.push(newPost);
    res.status(201).json({message:"Post created"});
});

app.use((req, res,next) => {
    res.status(404).json({message: 'Route not found'});
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
});
