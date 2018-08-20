const initialState = {
    user: {},
    search_title: '',
    search_keywords: '',
    search_tags: '',
    search_pickup_option: '',
    search_rent_option: true,
    search_sale_option: false,
    search_max_price: 0,
    search_max_distance: 0,
};

const USER_DATA = 'USER_DATA';
const SEARCH_TITLE = 'SEARCH_TITLE';
const SEARCH_KEYWORDS = 'SEARCH_KEYWORDS';
const SEARCH_TAGS = 'SEARCH_TAGS';
const SEARCH_PICKUP_OPTION = 'SEARCH_PICKUP_OPTION';
const SEARCH_RENT_OPTION = 'SEARCH_RENT_OPTION';
const SEARCH_SALE_OPTION = 'SEARCH_SALE_OPTION';
const SEARCH_MAX_PRICE = 'SEARCH_MAX_PRICE';
const SEARCH_MAX_DISTANCE= 'SEARCH_MAX_DISTANCE';


export function getUserInfo (user) {
    return {
        type: USER_DATA,
        payload: user
    };
};

export function handleSearchTitle (title) {
    return {
        type: SEARCH_TITLE,
        payload: title
    };
};

export function handleSearchKeywords (keywords) {
    return {
        type: SEARCH_KEYWORDS,
        payload: keywords
    };
};

export function handleSearchTags (tag) {
    return {
        type: SEARCH_TAGS,
        payload: tag
    };
};

export function handleSearchPickupOption (option) {
    return {
        type: SEARCH_PICKUP_OPTION,
        payload: option
    };
};

export function handleSearchRentOption () {
    return {
        type: SEARCH_RENT_OPTION,
    };
};

export function handleSearchSaleOption () {
    return {
        type: SEARCH_SALE_OPTION,
    };
};

export function handleSearchMaxPrice (price) {
    return {
        type: SEARCH_MAX_PRICE,
        payload: price
    };
};

export function handleSearchMaxDistance (distance) {
    return {
        type: SEARCH_MAX_DISTANCE,
        payload: distance
    };
};


export default function reducer (state=initialState, action){
    switch(action.type){

        case USER_DATA:
        return Object.assign({}, state, {user: action.payload})

        case SEARCH_TITLE:
        return Object.assign({}, state, {search_title: action.payload})

        case SEARCH_KEYWORDS:
        return Object.assign({}, state, {search_keywords: action.payload})

        case SEARCH_TAGS:
        return Object.assign({}, state, {search_tags: action.payload})

        case SEARCH_PICKUP_OPTION:
        return Object.assign({}, state, {search_pickup_option: action.payload})

        case SEARCH_RENT_OPTION:
        return Object.assign({}, state, {search_rent_option: !state.search_rent_option})

        case SEARCH_SALE_OPTION:
        return Object.assign({}, state, {search_sale_option: !state.search_sale_option})

        case SEARCH_MAX_PRICE:
        return Object.assign({}, state, {search_max_price: action.payload})

        case SEARCH_MAX_DISTANCE:
        return Object.assign({}, state, {search_max_distance: action.payload})
        
        default: return state;
    };
};