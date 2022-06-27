import { RoomDetail } from './custom';

// 파싱한 시각 기록하기 (nullable)
export interface Room {
    // 커스터마이징 속성
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    myhomeRoomDetail?: RoomDetail;
}

// 매물 목록 응답
export interface ArticleResponse {
    code: string;
    more: boolean;
    TIME: boolean;
    z: number;
    page: number;
    body: Room[];
}

// 네이버 파싱 기준 룸 유형
export interface Room {
    atclNo: string; // 매물 번호
    cortarNo: string; // 권역 번호
    atclNm: ArticleTypes; // 매물 유형 (단독)
    atclStatCd: string;
    rletTpCd: string;
    uprRletTpCd: string;
    rletTpNm: RletTypes;
    tradTpCd: /*전세*/ 'B1' | /*월세*/ 'B2'; // 매물 유형 코드
    tradTpNm: TradeTypes; // 매물 유형 (전세)
    vrfcTpCd: 'OWNER' | 'DOC';
    flrInfo: string; // 층 정보 '해당층/최고층'
    prc: number; // 가격 (만)
    rentPrc: number; // 월세 (만)
    hanPrc: string; // 보증금 한글 단위
    spc1: number; // 공급 면적
    spc2: number; // 전용 면적
    direction: string; // 안방 기준 방향
    atclCfmYmd: string; // 매물 등록일
    lat: number; // 위도
    lng: number; // 경도
    atclFetrDesc: string; // 매물 한 줄 설명
    tagList: string[]; // 매물 키워드
    bildNm: string; // 빌딩 명칭 (ex: 로제하우스)
    minute: number; // 0
    sameAddrCnt: number; // 🤔 동일 매물 개수?
    sameAddrDirectCnt: number; // 0
    cpid: string;
    cpNm: string; // 출처? ex) 피터팬의 좋은방구하기, NEONET, bizmk, SERVE, hkdotcom, R114 등...
    cpCnt: number;
    rltrNm: string; // 매물을 내놓은 부동산 이름
    directTradYn: string; // 'N'
    minMviFee?: number;
    maxMviFee?: number;
    etRoomCnt?: number;
    tradePriceHan?: string;
    tradeRentPrice?: number;
    tradeCheckedByOwner: boolean;
    cpLinkVO?: CpLinkVO;
    dtlAddrYn?: string;
    dtlAddr?: string;
}
export interface CpLinkVO {
    cpId: string;
    mobileArticleUrl?: string;
    mobileArticleLinkTypeCode: string;
    mobileBmsInspectPassYn: string;
    pcArticleLinkUseAtArticleTitle: boolean;
    pcArticleLinkUseAtCpName: boolean;
    mobileArticleLinkUseAtArticleTitle: boolean;
    mobileArticleLinkUseAtCpName: boolean;
}

export const getArticleTypes = () => ['빌라', '일반원룸', '래미안블레스티지', '다가구', '단독', '기타', '상가주택'];
export const getRletTypes = () => ['빌라', '원룸', '아파트', '단독/다가구', '상가주택'];
export const getTradeTypes = () => ['전세', '월세'];
export type ArticleTypes = ReturnType<typeof getArticleTypes>;
export type RletTypes = ReturnType<typeof getRletTypes>;
export type TradeTypes = ReturnType<typeof getTradeTypes>;

export interface ArticleInClusterList {
    lgeo: string;
    count: number;
    z: number;
    lat: number;
    lon: number;
    itemId?: string;
    tradTpCd?: string;
    rletNm?: string;
    tradNm?: string;
    priceTtl?: string;
    psr: number;
    minMviFee?: number;
    maxMviFee?: number;
}
