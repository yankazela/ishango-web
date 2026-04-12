import { AxiosResponse } from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "@/services/endpoints";
import { getRequest } from "@/services/requests";

import { EbaseUrls } from "@/services/requests/types";
import { ArticleCardDetails } from "./state";
import {
    fetchArticleCardsFailure,
    fetchArticleCardsStart,
    fetchArticleCardsSuccess,
    fetchCurrentArticleStart,
    fetchCurrentArticleSuccess,
    fetchCurrentArticleFailure,
} from "./slice";

const getArticleCards = async (language: string): Promise<ArticleCardDetails[]> => {
    try {
        const path = endpoints.getArticleCards(language);

       const response: AxiosResponse<ArticleCardDetails[]> = await getRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
            },
            EbaseUrls.ISHANGO_BE
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCurrentArticle = async (slug: string): Promise<string> => {
    try {
            const path = endpoints.getArticleContent(slug);

            const response: AxiosResponse<{ content: string }> = await getRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
            },
            EbaseUrls.ISHANGO_BE
        );
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

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