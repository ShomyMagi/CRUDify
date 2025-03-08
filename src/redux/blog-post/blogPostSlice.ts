import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  addBlogPost,
  BlogPost,
  deleteBlogPost,
  editBlogPost,
  getMembers,
} from "../../data/data";
import { RootState } from "../store";

// get
export const fetchBlogPosts = createAsyncThunk<BlogPost[]>(
  "blogPosts/fetchBlogPosts",
  async () => getMembers(),
);

// delete
export const removePost = createAsyncThunk<string, string>(
  "blogPosts/removePost",
  async (id: string) => {
    try {
      await deleteBlogPost(id);
      return id;
    } catch (error) {
      throw new Error("Failed to delete a post!");
    }
  },
);

// insert
export const addPost = createAsyncThunk<BlogPost, BlogPost>(
  "blogPosts/addPost",
  async (post: BlogPost) => {
    try {
      await addBlogPost(post);
      return post;
    } catch (error) {
      throw new Error("Failed to add post!");
    }
  },
);

// update
export const editPost = createAsyncThunk<
  BlogPost,
  { postId: string; data: Omit<BlogPost, "id"> }
>("blogPosts/editPost", async ({ postId, data }) => {
  try {
    const updatedPost = await editBlogPost(postId, data);
    return updatedPost;
  } catch (error) {
    throw new Error("Failed to edit post!");
  }
});

export interface BlogPostState {
  blogPostList: BlogPost[];
  loading: boolean;
  editingPost: BlogPost | null;
  newPost: {
    title: string;
    body: string;
  };
}

const initialState = {
  blogPostList: [],
  loading: false,
  editingPost: null,
  newPost: {
    title: "",
    body: "",
  },
} as BlogPostState;

export const blogPostSlice = createSlice({
  name: "blogPost",
  initialState,
  reducers: {
    setNewPostTitle(state, action: PayloadAction<string>) {
      state.newPost.title = action.payload;
    },
    setNewPostBody(state, action: PayloadAction<string>) {
      state.newPost.body = action.payload;
    },
    setEditingPost(state, action: PayloadAction<BlogPost | null>) {
      state.editingPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, { payload }) => {
        state.blogPostList.push(...payload);
        state.loading = false;
      })
      .addCase(removePost.fulfilled, (state, { payload }) => {
        state.blogPostList = state.blogPostList.filter(
          (post) => post.id !== payload,
        );
        state.loading = false;
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.blogPostList = [...state.blogPostList, payload];
        state.newPost.title = "";
        state.newPost.body = "";
        state.loading = false;
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.blogPostList = state.blogPostList.map((post) =>
          post.id === payload.id ? payload : post,
        );
        state.loading = false;
      });
  },
});

// actions
export const { setNewPostTitle, setNewPostBody, setEditingPost } =
  blogPostSlice.actions;

// selectors
export const selectBlogPosts = (state: RootState) =>
  state.blogPost.blogPostList;
export const selectNewPost = (state: RootState) => state.blogPost.newPost;
export const selectEditingPost = (state: RootState) =>
  state.blogPost.editingPost;

export default blogPostSlice.reducer;
