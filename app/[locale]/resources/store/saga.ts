import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
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
        const articleIndex: Awaited<ReturnType<typeof getArticleCards>> = yield call(getArticleCards, action.payload);
        yield put(fetchArticleCardsSuccess(articleIndex));
    } catch (error: any) {
        yield put(fetchArticleCardsFailure(error?.message ?? "Failed to fetch article index"));
    }
}

function* fetchCurrentArticle(action: PayloadAction<string>) {
    try {
        const articleContent: string = yield call(getCurrentArticle, action.payload);
        yield put(fetchCurrentArticleSuccess(articleContent));
    } catch (error: any) {
        yield put(fetchCurrentArticleFailure(error?.message ?? "Failed to fetch article"));
    }
}

export function* blogSaga() {
    yield takeLatest(fetchArticleCardsStart.type, fetchArticleCards);
    yield takeLatest(fetchCurrentArticleStart.type, fetchCurrentArticle);
}

export default blogSaga;