/*
options:
{
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
    'Content-Type': 'application/json'
  },
	groupId: '/v2/group-7'
}
*/
class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.groupId = options.groupId;

        if ( !options.baseUrl ) throw new Error( 'Server URL required!' );
        if ( !options.groupId ) throw new Error( 'Group name required!' );
    }

    /*
    Регистрация
    Возвращает:

    {
        "name": "Иван Иванов",
        "about": "Писатель",
        "avatar": "https://react-learning.ru/image-compressed/default-image.jpg",
        "isAdmin": false,
        "_id": "622fa50dae5c40c10c11dfe6",
        "email": "admin2@react-learning.ru",
        "group": "group-7",			
        "__v": 0
    }
    */
    async signUp(email, password) {
        const init = {
            method: 'POST', 
            headers: this.headers, 
            body: JSON.stringify({
                email, 
                password,
                group: this.groupId, 
            }), 
        }

        const response = await fetch(`${this.baseUrl}/signup`, init);

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error('Некорректно заполнено одно из полей');
                case 409: 
                    throw new Error('Юзер с указанным email уже существует');
                default:
                    throw new Error(`Status code is ${response.status}`);
            }
        }

        const result = await response.json();

        return result;
    }

    /*
    Авторизация
    Возвращает:

    {
        "data": {
            "name": "Иван Иванов",
            "about": "Писатель",
            "avatar": "https://react-learning.ru/image-compressed/default-image.jpg",
            "_id": "622fa50dae5c40c10c11dfe6",
            "email": "admin2@react-learning.ru",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmYTUwZGFlNWM0MGMxMGMxMWRmZTYiLCJpYXQiOjE2NDcyODk5NDgsImV4cCI6MTY3ODgyNTk0OH0.4_rJEsFmbvcWUGTI3SD4Lqt8qTNamoCIiFmlSFNbSbM"
    }
    */
    async signIn(email, password) {
        const init = {
            method: 'POST',
            headers: this.headers, 
            body: JSON.stringify({
                email, 
                password, 
            }), 
        }

        const response = await fetch(`${this.baseUrl}/signin`, init);

        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw new Error('Не правильные логин или пароль');
                case 404:
                    throw new Error('Пользователь с email не найден');
                default:
                    throw new Error(`Status code is ${response.status}`);
            }
        }

        const result = await response.json();

        this.headers.authorization = `Bearer ${result.token}`;

        return result;
    }

    /*
    Проверка валидности токена и получение информации о пользователе
    Возвращает:

    {
        "name": "Василий",
        "about": "Программист",
        "avatar": "https://react-learning.ru/image-compressed/default-image.jpg",
        "_id": "622f9992ae5c40c10c11dfe4",
        "email": "admin@react-learning.ru",
        "__v": 0
    }
    */
    async getUserData() {
        const init = {
            headers: this.headers, 
        }

        const response = await fetch( `${this.baseUrl}/v2/${this.groupId}/users/me`, init );

        if( !response.ok ) {
            throw new Error( `Error! Status code is ${response.status}` );
        }

        const result = await response.json();

        return result;
    }

    /*
    Загрузка товаров с сервера
    Возвращает: 
    [
        {
            "available": true,
            "pictures": "https://react-learning.ru/image-compressed/1.jpg",
            "likes": [
                "622bd81b06c7d323b8ae4614"
            ],
            "reviews": [],
            "tags": [
                "new"
            ],
            "isPublished": true,
            "_id": "622c779c77d63f6e70967d1c",
            "name": "Желудки утиные сушено-вяленые",
            "author": {
                "name": "Максим Иванов",
                "about": "Наставник",
                "avatar": "https://u.kanobu.ru/articles/pics/7e6dc974-43f4-4ad0-9a55-2465566e9662.jpg",
                "_id": "622bd81b06c7d323b8ae4614",
                "email": "maxim_91@inbox.ru",
                "__v": 0
            },
            "price": 550,
            "discount": 15,
            "stock": 10,
            "wight": "100 г",
            "description": "Описание demo",
            "created_at": "2022-03-12T10:36:12.324Z",
            "updated_at": "2022-03-12T22:09:06.806Z",
            "__v": 0
        },
    ]
    */
    async getProducts() {
        const init = {
            headers: this.headers, 
        }
        const response = await fetch(`${this.baseUrl}/products`, init);

        if(!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error('Токен не передан или передан не в том формате');
                case 401:
                    throw new Error('Переданный токен некорректен');
                default:
                    throw new Error(`Status code is ${response.status}`);
            }
        }

        const result = await response.json();

        return result;
    }

    async getProductsByIds(ids) {
        return Promise.all(ids.map(id => this.getProduct(id)));
    }

    async getProduct( id ) {
        const init = {
            headers: this.headers, 
        }

        const response = await fetch( `${ this.baseUrl }/products/${ id }`, init );

        if ( !response.ok ) {
            switch ( response.status ) {
                default: 
                    throw new Error( `Error ${ response.status }: ${ response.statusText }` );
            }
        }

        const result = await response.json();

        return result;
    }

    /*
    Постановка лайка продукта
    В ответе придёт обновлённый JSON с постом. 
    */
    async setProductLike( productId ) {
        const init = {
            method: 'PUT', 
            headers: this.headers, 
        }
        const response = await fetch( `${this.baseUrl}/products/likes/${productId}`, init );

        if( !response.ok ) {
            switch ( response.status ) {
                case 401:
                    throw new Error( 'Пользователь не авторизован' );
                case 404:
                    throw new Error( 'Нет карточки по заданному id' );
                default:
                    throw new Error( `Status code is ${response.status}`);
            }
        }

        const result = await response.json();

        return result;
    }

    /*
    Снятие лайка продукта
    В ответе придёт обновлённый JSON с постом. 
    */
    async removeProductLike( productId ) {
        const init = {
            method: 'DELETE', 
            headers: this.headers, 
        }

        const response = await fetch( `${this.baseUrl}/products/likes/${productId}`, init );

        if( !response.ok ) {
            switch ( response.status ) {
                case 401:
                    throw new Error( 'Пользователь не авторизован' );
                case 404:
                    throw new Error( 'Нет карточки по заданному id' );
                default:
                    throw new Error( `Status code is ${response.status}`);
            }
        }

        const result = await response.json();

        return result;
    }

    /*
    изменение name и about Пользователя
    В ответе придёт обновлённый JSON с пользователем.
    */
    async updateUserInfo( body ) {
        const init = {
            method: 'PATCH', 
            headers: this.headers,
            body: JSON.stringify( body ), 
        }

        const response = await fetch( `${ this.baseUrl }/v2/${ this.groupId }/users/me`, init );

        if ( !response.ok ) {
            switch ( response.status ) {
                case 400: 
                    const result = await response.json();
                    
                    throw new Error( `Status code is ${response.status}: ${result.message}` );
                default:
                    throw new Error( `Status code is ${response.status}: ${ response.statusText }` );                
            }
        }

        const result = await response.json();

        return result;
    }

    /*
    изменение avatar Пользователя. 
    data = {
        avatar: 'https://react-learning.ru/image-compressed/default-image.jpg'
    }
    В ответе придёт обновлённый JSON с пользователем.
    */
    async updateUserAvatar( data ) {
        const init = {
            method: 'PATCH', 
            headers: this.headers, 
            body: JSON.stringify( data )
        }

        const response = await fetch( `${ this.baseUrl }/v2/${ this.groupId }/users/me/avatar`, init );

        if ( !response.ok ) {
            switch ( response.status ) {
                case 400: 
                    const result = await response.json();
                    
                    throw new Error( `Status code is ${response.status}: ${result.message}` );
                default:
                    throw new Error( `Status code is ${response.status}: ${ response.statusText }` );
            }
        }
    }

    async search(param) {
        const init = {
            headers: this.headers, 
        }

        const response = await fetch(`${this.baseUrl}/products/search?query=${param}`, init);

        if ( !response.ok ) {
            switch ( response.status ) {
                case 400: 
                    const result = await response.json();
                    
                    throw new Error( `Status code is ${response.status}: ${result.message}` );
                default:
                    throw new Error( `Status code is ${response.status}: ${ response.statusText }` );
            }
        }

        const result = await response.json();

        return result;
    }

    async getComment(productId) {
        const init = {
            headers: this.headers, 
        }

        const response = await fetch(`${this.baseUrl}/products/review/${productId}`, init);

        if (!response.ok) {
            throw new Error(`Error! Status code is ${response.status}`);
        }

        const result = await response.json();

        return result;
    }
}

export {
    Api, 
}