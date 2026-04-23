import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { ArticleCardDetails } from "./state";
import { getArticleCards, getCurrentArticle } from "./api";
import {
    fetchArticleCardsFailure,
    fetchArticleCardsStart,
    fetchArticleCardsSuccess,
    fetchCurrentArticleStart,
    fetchCurrentArticleSuccess,
    fetchCurrentArticleFailure,
} from "./slice";

function* fetchArticleCards(action: PayloadAction<string>) {
    try {
        const articleCards: ArticleCardDetails[] = yield call(getArticleCards, action.payload);
        yield put(fetchArticleCardsSuccess(articleCards));
    } catch (error) {
        yield put(fetchArticleCardsFailure(error));
    }
}

function* fetchCurrentArticle(action: PayloadAction<string>) {
    try {
        const articleContent: string = yield call(getCurrentArticle, action.payload);
        yield put(fetchCurrentArticleSuccess(articleContent));
    } catch (error) {
        yield put(fetchCurrentArticleFailure(error));
    }
}


export function* blogSaga() {
    yield takeLatest(fetchArticleCardsStart.type, fetchArticleCards);
    yield takeLatest(fetchCurrentArticleStart.type, fetchCurrentArticle);
}

export default blogSaga;