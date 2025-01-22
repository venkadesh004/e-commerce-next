import { Auth, FooterBlock, ProductReference, Rating, SaleGroup, Specials, Specifications } from "./component";
import { Img, Link } from "./pages";

export type HeaderRes = {
    uid: string;
    title: string;
    logo: Img;
    header_links: Link[];
    auth: Auth[];
};

export type MainPageRes = {
    uid: string;
    title: string;
    main_page_header: string;
    main_page_para: string;
    see_more: Link;
    image: Img;
    specials: Specials[];
};

export type MainPageSalesRes = {
    uid: string;
    title: string;
    group: SaleGroup[];
};

export type FooterRes = {
    uid: string;
    title: string;
    footer_block: FooterBlock[];
};

export type Filter = {
    uid: string;
    title: string;
};

export type Products = {
    uid: string;
    title: string;
    url: string;
    image: Img;
    price: number;
    product_desp: string;
    seller_desp: string;
    specifications: Specifications[];
    rating: Rating[];
    reference: Filter[];
    stock: number;
    referenceDevice: string;
};

export type ProductPage = {
    uid: string;
    title: string;
    reference_filter: Filter[];
    reference: ProductReference[];
};