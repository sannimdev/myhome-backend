export interface SearchArticleRequest {
    view?: string;
    itemId?: string;
    mapKey?: string;
    lgeo?: string;
    rletTpCd?: string;
    tradTpCd?: string;
    z: string | number;
    lat: string | number;
    lon: string | number;
    btm?: string;
    lft?: string;
    top?: string;
    rgt?: string;
    cortarNo?: string;
    pCortarNo?: string;
    showR0?: string;
    wprcMin?: string;
    wprcMax?: string;
    spcMin?: string;
    spcMax?: string;
    tag?: string;
    page?: string | number;
    sort?: SearchOrder;
    totCnt?: number;
    addon?: string;
    bAddon?: string;
    isOnlyIsale?: string;
}

export type SearchOrder =
    | 'rank'
    | 'dateDesc'
    | /* 낮은가격순 */ 'prc'
    | /* 높은가격순 */ 'prcDesc'
    | /* 넓은면적순 */ 'spcDesc'
    | /* 좁은면적순 */ 'spc';

export interface SearchClusterList {
    view: string;
    cortarNo?: string;
    rletTpCd: string;
    tradTpCd: string;
    z: string;
    lat: string;
    lon: string;
    btm: string;
    lft: string;
    top: string;
    rgt: string;
    wprcMin?: string;
    wprcMax?: string;
    spcMin?: string;
    spcMax?: string;
    rprcMin?: string;
    rprcMax?: string;
    tag?: string;
    pCortarNo: string;
}
