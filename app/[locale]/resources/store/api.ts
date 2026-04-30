import { AxiosResponse } from "axios";
import { endpoints } from "@/services/endpoints";
import { getRequest } from "@/services/requests";
import { EbaseUrls } from "@/services/requests/types";
import { ArticleCardDetails } from "./state";

export const getArticleCards = async (
  language: string
): Promise<ArticleCardDetails[]> => {
  const path = endpoints.getArticleCards(language);

  const response: AxiosResponse<ArticleCardDetails[]> = await getRequest(
    {
      path: path.endpoint,
      auth: path.auth,
      headers: path.headers,
    },
    EbaseUrls.ISHANGO_BE
  );

  return response.data;
};

export const getCurrentArticle = async (slug: string): Promise<string> => {
  const path = endpoints.getArticleContent(slug);

  const response: AxiosResponse<{ content: string }> = await getRequest(
    {
      path: path.endpoint,
      auth: path.auth,
      headers: path.headers,
    },
    EbaseUrls.ISHANGO_BE
  );

  return response.data.content;
};