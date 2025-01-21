export type Img = {
    url: string;
    uid: string;
    title: string;
    filename: string;
    $: Img;
};

export type Link = {
    title: string;
    href: string;
    $?: Link;
};