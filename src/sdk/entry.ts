'use client';

import * as Utils from "@contentstack/utils";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
// import getConfig from "next/config";
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from "./utils";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetReferenceData = {
  contentTypeUid: string;
  entryUid: string;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

// const { publicRuntimeConfig } = getConfig();
// const envConfig = process.env.CONTENTSTACK_API_KEY
//   ? process.env
//   : publicRuntimeConfig;

let customHostBaseUrl = process.env.NEXT_PUBLIC_CONTENTSTACK_API_HOST as string;

customHostBaseUrl = customHostBaseUrl ? customHostUrl(customHostBaseUrl) : '';

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (!!customHostBaseUrl && isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
ContentstackLivePreview.init({
  stackSdk: Stack,
  clientUrlParams: {
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
  },
  ssr: false,
})?.catch((err) => console.error(err));

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

export const getReferenceData = ({
  contentTypeUid,
  entryUid
}: GetReferenceData) => {
  return new Promise((resolve, reject) => {
    const Query = Stack.ContentType(contentTypeUid).Entry(entryUid).toJSON();
    // Query.includeReference(['products_page']);
    Query
      .fetch()
      .then(
        (result) => {
          console.log(result)
          resolve(result);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      )
  });
}

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};