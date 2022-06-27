export type RoomDetail = {
    property: {
        [key: string]: string;
    };
    facility: {
        [key: string]: Object;
    };
    images: string[];
    address?: string;
};
