import { Img, Link } from "./pages";

export type Auth = {
    uid: string;
    auth_link: Link;
    background_inverted: boolean;
};

export type Specials = {
    uid: string;
    special_image: Img;
    special_head: string;
    special_para: string;
};

export type SaleGroup = {
    uid: string;
    image: Img;
    link: Link;
    para: string;
};

export type LinksBlock = {
    link_title: string;
    links: Link[];
};

export type FooterBlock = {
    image_block: {
        image: Img;
    };
    links_block: LinksBlock;
};

export type Specifications = {
    enter_specifications: string;
};

export type Rating = {
    stars: {
        value: number
    };
    review: string;
};