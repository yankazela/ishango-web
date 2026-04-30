import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country, CountriesState, CountryArticle } from "./state";

const initialState: CountriesState = {
  countries: {
    items: [],
    loading: false,
    error: null,
  },
  articles: {
    items: [],
    loading: false,
    error: null,
  },
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    fetchCountries(state) {
      state.countries.loading = true;
      state.countries.error = null;
    },
    fetchCountriesSuccess(state, action: PayloadAction<Country[]>) {
      state.countries.items = action.payload;
      state.countries.loading = false;
    },
    fetchCountriesFailure(state, action: PayloadAction<string>) {
      state.countries.error = action.payload;
      state.countries.loading = false;
    },
    fetchArticles(state, action: PayloadAction<{ language: string }>) {
      state.articles.loading = true;
      state.articles.error = null;
    },
    fetchArticlesSuccess(state, action: PayloadAction<CountryArticle[]>) {
      state.articles.items = action.payload;
      state.articles.loading = false;
    },
    fetchArticlesFailure(state, action: PayloadAction<string>) {
      state.articles.error = action.payload;
      state.articles.loading = false;
    },
  },
});

export const {
  fetchCountries,
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchArticles,
  fetchArticlesSuccess,
  fetchArticlesFailure,
} = countriesSlice.actions;

export default countriesSlice.reducer;
