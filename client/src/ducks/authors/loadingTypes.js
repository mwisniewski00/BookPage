const GET_ALL_AUTHORS_REQUEST = 'GET_ALL_AUTHORS_REQUEST';
const CREATE_AUTHOR_REQUEST = 'CREATE_AUTHOR_REQUEST';
const DELETE_AUTHOR_REQUEST = 'DELETE_AUTHOR_REQUEST';
const UPDATE_AUTHOR_REQUEST = 'UPDATE_AUTHOR_REQUEST';
const GET_ONE_AUTHOR_REQUEST = "GET_ONE_AUTHOR_REQUEST";
const GET_AUTHORS_BY_BOOK_REQUEST = "GET_AUTHORS_BY_BOOK_REQUEST"

const GET_ALL_AUTHORS_SUCCESS = 'GET_ALL_AUTHORS_SUCCESS';
const CREATE_AUTHOR_SUCCESS = 'CREATE_AUTHOR_SUCCESS';
const DELETE_AUTHOR_SUCCESS = 'DELETE_AUTHOR_SUCCESS';
const UPDATE_AUTHOR_SUCCESS = 'UPDATE_AUTHOR_SUCCESS';
const GET_ONE_AUTHOR_SUCCESS = "GET_ONE_AUTHOR_SUCCESS";
const GET_AUTHORS_BY_BOOK_SUCCESS = "GET_MANY_AUTHORS_SUCCESS"

const GET_ALL_AUTHORS_FAILURE = 'GET_ALL_AUTHORS_FAILURE';
const CREATE_AUTHOR_FAILURE = 'CREATE_AUTHOR_FAILURE';
const DELETE_AUTHOR_FAILURE = 'DELETE_AUTHOR_FAILURE';
const UPDATE_AUTHOR_FAILURE = 'UPDATE_AUTHOR_FAILURE';
const GET_ONE_AUTHOR_FAILURE = "GET_ONE_AUTHOR_FAILURE";
const GET_AUTHORS_BY_BOOK_FAILURE = "GET_AUTHORS_BY_BOOK_FAILURE"

const loadingTypes = {
    GET_ALL_AUTHORS_REQUEST,
    CREATE_AUTHOR_REQUEST,
    DELETE_AUTHOR_REQUEST,
    UPDATE_AUTHOR_REQUEST,
    GET_ONE_AUTHOR_REQUEST,
    GET_AUTHORS_BY_BOOK_REQUEST,
    GET_ALL_AUTHORS_SUCCESS,
    CREATE_AUTHOR_SUCCESS,
    DELETE_AUTHOR_SUCCESS,
    UPDATE_AUTHOR_SUCCESS,
    GET_ONE_AUTHOR_SUCCESS,
    GET_AUTHORS_BY_BOOK_SUCCESS,
    GET_ALL_AUTHORS_FAILURE,
    CREATE_AUTHOR_FAILURE,
    DELETE_AUTHOR_FAILURE,
    UPDATE_AUTHOR_FAILURE,
    GET_ONE_AUTHOR_FAILURE,
    GET_AUTHORS_BY_BOOK_FAILURE
}

export default loadingTypes;