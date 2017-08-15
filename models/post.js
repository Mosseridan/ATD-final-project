const mongoose = require('mongoose');
const config = require('../config/database');
const utils = require('./utils');
const User = require('./user');
const app = require('../app.js');

// Post schema
const PostSchema = mongoose.Schema({
    author: {
        type: String,
        required: false
    },
    coauthors: {
        type: [String],
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    ingredients: {
        type: [String],
        required: false
    },
    images: {
        type: [String],
        required: false
    },
    instructions: [{ images: [String], text: String }],
    likes: {
        type: [String],
        required: false
    },
    likes_count: {
        type: Number,
        required: true
    },
    comments: [{ user: String, text: String, creationTime: Date }],
    creationTime: {
        type: Date,
        required: false
    },
    updateTime: {
        type: Date,
        required: false
    },


});

PostSchema.index({ '$**': 'text' });

const Post = module.exports = mongoose.model('Post', PostSchema);
//Post.index({ '$**': 'text' });


// NOTE: extract in a simpler way
function objectIdQuery(postId) {
    var ObjectId = mongoose.Types.ObjectId;
    let y = new ObjectId(postId);
    let x = { _id: y };
    return x;
}

module.exports.getPostById = function (id, callback) {
    Post.findById(id, callback);
}



module.exports.emitPosts = function(event, pipeline, callback) {
    Post.aggregate(pipeline.concat([
       { $lookup: {
            from: "users",
            localField: "author",
            foreignField: "username",
            as: "author_user" } },
    ])).exec(callback);
    
    
    // posts.cursor().map((post) => {
    //     console.log('@@@ post:', post);
    //     app.socketEmit('top-posts', post);
    //     return post;
    // }).next(callback);
}

module.exports.getAllPosts = function (callback) {
    Post.find({}, callback);
}


module.exports.getFeed = function (page, username, callback){
    User.getUserById(username, (err, user) => {
        if(err) callback(err);
        else if (!user) callback('Could not find user');
        else utils.getPage(page, utils.sortByTime(Post.find({author: {$in: user.following}}))).exec(callback);
    })
}

module.exports.getTopPosts = function (page, callback) {
    utils.getPage(page,
        Post.find().sort({ 'likes_count': -1})).exec(callback);
    //  this.emitPosts('top-posts',
    //     [{ $sort: { likes_count: -1 }}]
    //     .concat(utils.getPageExpression(page))
    //     , callback);
}


module.exports.getUserPosts = function (page, username, callback) {
    utils.getPage(page,
        utils.sortByTime(
            Post.find({ $or: [{ author: username }, { coauthors: username }] }))).exec(callback);
}


module.exports.searchByText = function (page, query, callback) {
    utils.getPage(page,
        Post.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } })).exec(callback);
}

module.exports.savePost = function (post, callback) {
    post.save(callback);
}

module.exports.editPost = function (postId, editedPost, callback) {
    let query = objectIdQuery(postId);
    Post.findOneAndUpdate(query, editedPost, { returnNewDocument: true }, callback);
}

module.exports.addComment = function (postId, newComment, callback) {
    Post.findOneAndUpdate(objectIdQuery(postId), { $push: { comments: newComment } }, callback);
}

module.exports.setLike = function (postId, userUd, callback) {
    Post.update(objectIdQuery(postId), { $addToSet: { likes: username } }, callback);
}

module.exports.setDislike = function (postId, username, callback) {
    Post.update(objectIdQuery(postId), { $pull: { likes: username } }, callback);
}

module.exports.deletePost = function (postId, callback) {
    Post.remove({ _id, postId }, callback);
}

module.exports.addPostPics = function (postId, images, callback) {
    Post.update({ _id: postId }, {$push: {'images': images}}, callback);
}

module.exports.removePostPic = function (postId, image, callback) {
    Post.update({ _id: postId }, {$pull: {'images': image}}, callback);
}

module.exports.deletePost = function(postId ,userId, callback){
    Post.deletOne({_id: postId, author: userId}, callback);
}

module.exports.updatePost = function (newPost, username, callback) {
    // console.log(newPost);
    if(!newPost) callback('no post supplied');
    Post.getPostById(newPost._id, (err, post) => {
        if (err) callback(err);
        else if (!post) callback('now such post');
        else if (post.author == username || post.coauthors.includes(username)){ 
            post.title = newPost.title;
            post.description = newPost.description;
            post.ingredients = newPost.ingredients;
            post.images = newPost.images;
            post.instructions = newPost.instructions;
            post.updateTime = Date.now();
            post.coauthors = newPost.coauthors;
            Post.savePost(post, (err, post) => {
                if (err) callback(err);
                else callback(null, 'Congratulations! Your recipe was successfully edited.');
            });
        }
        else callback( 'Cannot edit recipe you do not own.' );        
    });
}
