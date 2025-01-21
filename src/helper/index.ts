'use client';

import { Filter, FooterRes, HeaderRes, MainPageRes, MainPageSalesRes, ProductPage, Products } from "../typescript/response";
import {getEntry, getEntryByUrl, getReferenceData} from '../sdk/entry';
import { ProductReference } from "@/typescript/component";

export const getHeaderRes = async (): Promise<HeaderRes> => {
    const response = await getEntry({
        contentTypeUid: "e_commerce_header",
        referenceFieldPath: [],
        jsonRtePath: []
    }) as HeaderRes[][];

    return response[0][0];
}

export const getMainPageRes = async (): Promise<MainPageRes> => {
    const response = await getEntry({
        contentTypeUid: "e_commerce_main_page",
        referenceFieldPath: [],
        jsonRtePath: []
    }) as MainPageRes[][];

    return response[0][0];
}

export const getSalesPageRes = async (): Promise<MainPageSalesRes> => {
    const response = await getEntry({
        contentTypeUid: "e_commerce_main_page_sales",
        referenceFieldPath: [],
        jsonRtePath: []
    }) as MainPageSalesRes[][];

    return response[0][0];
}

export const getFooterPageRes = async (): Promise<FooterRes> => {
    const response = await getEntry({
        contentTypeUid: "e_commerce_footer",
        jsonRtePath: [],
        referenceFieldPath: []
    }) as FooterRes[][];

    return response[0][0];
}

export const getProduct = async (entryUrl: string): Promise<Products> => {
    const response = await getEntryByUrl({
        contentTypeUid: "product_content_type",
        entryUrl,
        referenceFieldPath: [],
        jsonRtePath: []
    }) as Products[];

    // console.log(response);

    return response[0];
}

export const getProductPage = async (): Promise<ProductPage> => {
    const response = await getEntry({
        contentTypeUid: "products_page",
        jsonRtePath: [],
        referenceFieldPath: ["product_content_type"]
    }) as ProductPage[][];

    return response[0][0];
}

export const getReferenceProduct = async (entryUid: string): Promise<Products> => {
    const response = await getReferenceData({
        contentTypeUid: "product_content_type",
        entryUid: entryUid
    }) as Products;

    return response;
}

export const getReferenceDevice = async (entryUid: string): Promise<Filter> => {
    const response = await getReferenceData({
        contentTypeUid: "filter",
        entryUid: entryUid
    }) as Filter;

    return response;
}