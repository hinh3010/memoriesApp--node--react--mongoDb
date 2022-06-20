// library
import express from 'express';
import mongoose from 'mongoose';
// file
import PostMessage from '../models/postMessage.js';

const router = express.Router();

// read all posts
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        return res.status(200).json(postMessages);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

// read a post by id
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

// create a new post
export const createPost = async (req, res) => {
    // console.log(req.body)
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        return res.status(201).json(newPostMessage);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

// update a post by id
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    try {
        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

        return res.json(updatedPost);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}


// deleted a post by id
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    try {
        await PostMessage.findByIdAndRemove(id);

        return res.json({ message: "Post deleted successfully." });
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

// update like count a post by id
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    try {
        const post = await PostMessage.findById(id);

        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

        return res.json(updatedPost);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}


export default router;