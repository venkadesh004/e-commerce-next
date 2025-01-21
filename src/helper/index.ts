'use client';

import { FooterRes, HeaderRes, MainPageRes, MainPageSalesRes, Products } from "../typescript/response";
import {getEntry, getEntryByUrl} from '../sdk/entry';

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
    }) as Products;

    console.log(response);

    return response;
}