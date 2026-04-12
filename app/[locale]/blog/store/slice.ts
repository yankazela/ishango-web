import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogState } from "./state";

const initialState: BlogState = {
    articleCards: {
        data: null,
        loading: false,
        error: null,
    },
    currentArticle: {
        data: null,
        loading: false,
        error: null,
    },
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        fetchArticleCardsStart(state, action: PayloadAction<string>) {
            state.articleCards.loading = true;
            state.articleCards.error = null;
        },
        fetchArticleCardsSuccess(state, action) {
            state.articleCards.data = action.payload;
            state.articleCards.loading = false;
        },
        fetchArticleCardsFailure(state, action) {
            state.articleCards.error = action.payload;
            state.articleCards.loading = false;
        },
        fetchCurrentArticleStart(state, action: PayloadAction<string>) {
            state.currentArticle.loading = true;
            state.currentArticle.error = null;
        },
        fetchCurrentArticleSuccess(state, action) {
            state.currentArticle.data = action.payload;
            state.currentArticle.loading = false;
        },
        fetchCurrentArticleFailure(state, action) {
            state.currentArticle.error = action.payload;
            state.currentArticle.loading = false;
        },
    },
});

export const {
    fetchArticleCardsStart,
    fetchArticleCardsSuccess,
    fetchArticleCardsFailure,
    fetchCurrentArticleStart,
    fetchCurrentArticleSuccess,
    fetchCurrentArticleFailure,
} = blogSlice.actions;

export default blogSlice.reducer;