// css 
import classes from './Icon.module.css';

function Icon() {}

function IconCart({ className }) {
    const cn = className ? [classes.icon, classes.cart, className].join(' ') : [classes.icon, classes.cart].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
    )
}

function IconCartDash({ className }) {
    const cn = className ? [classes.icon, classes.cartDash, className].join(' ') : [classes.icon, classes.cartDash].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z"/>
        </svg>
    )
}

function IconHeart({ className }) {
    const cn = className ? [classes.icon, classes.heart, className].join(' ') : [classes.icon, classes.heart].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
    )
}

function IconHouse({ className }) {
    const cn = className ? [classes.icon, classes.house, className].join(' ') : [classes.icon, classes.house].join(' ') ;

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
        </svg>
    )
}

function IconUser({ className }) {
    const cn = className ? [classes.icon, classes.user, className].join(' ') : [classes.icon, classes.user].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
    )
}

function IconStar({ className }) {
    const cn = className ? [classes.icon, classes.star, className].join(' ') : [classes.icon, classes.star].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    )
}

function IconLogout({ className }) {
    const cn = className ? [classes.icon, classes.logout, className].join(' ') : [classes.icon, classes.logout].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
    )
}

function IconSearch({ className }) {
    const cn = className ? [classes.icon, classes.search, className].join(' ') : [classes.icon, classes.search].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
    )
}

function IconTrash({ className }) {
    const cn = className ? [classes.icon, classes.trash, className].join(' ') : [classes.icon, classes.trash].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg>
    )
}

function IconArrowLeft({ className }) {
    const cn = className ? [classes.icon, classes.arrowLeft, className].join(' ') : [classes.icon, classes.arrowLeft].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
    )
}

function IconMinusCircle({ className }) {
    const cn = className ? [classes.icon, classes.minusCircle, className].join(' ') : [classes.icon, classes.minusCircle].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
        </svg>
    )
}

function IconPlusCircle({ className }) {
    const cn = className ? [classes.icon, classes.plusCircle, className].join(' ') : [classes.icon, classes.plusCircle].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
    )
}

function IconCheckCircle({ className }) {
    const cn = className ? [classes.icon, classes.checkCircle, className].join(' ') : [classes.icon, classes.checkCircle].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
    )
}

function IconChevron({ className }) {
    const cn = className ? [classes.icon, classes.chevron, className].join(' ') : [classes.icon, classes.chevron].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    )
}

function IconFileAdd({ className }) {
    const cn = className ? [classes.icon, classes.fileAdd, className].join(' ') : [classes.icon, classes.fileAdd].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"/>
        </svg>
    )
}

function IconPencil({ className }) {
    const cn = className ? [classes.icon, classes.pencil, className].join(' ') : [classes.icon, classes.pencil].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
    )
}

function IconKebab({ className }) {
    const cn = className ? [classes.icon, classes.kebab, className].join(' ') : [classes.icon, classes.kebab].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
    )
}

function IconClose({ className }) {
    const cn = className ? [classes.icon, classes.close, className].join(' ') : [classes.icon, classes.close].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>        
        </svg>
    )
}

function IconCheckSquare({ className }) {
    const cn = className ? [classes.icon, classes.checkSquare, className].join(' ') : [classes.icon, classes.checkSquare].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
        </svg>
    )
}

function IconCancelSquare({ className }) {
    const cn = className ? [classes.icon, classes.cancelSquare, className].join(' ') : [classes.icon, classes.cancelSquare].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    )
}

function IconChevronDown({ className }) {
    const cn = className ? [classes.icon, classes.chevronDown, className].join(' ') : [classes.icon, classes.chevronDown].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
    )
}

function IconChevronUp({ className }) {
    const cn = className ? [classes.icon, classes.chevronUp, className].join(' ') : [classes.icon, classes.chevronUp].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
        </svg>
    )
}

function IconFilter({ className }) {
    const cn = className ? [classes.icon, classes.filter, className].join(' ') : [classes.icon, classes.filter].join(' ');

    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
        >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
        </svg>
    )
}

export {
    Icon, 
    IconCart, 
    IconCartDash, 
    IconHeart, 
    IconHouse, 
    IconUser, 
    IconStar, 
    IconLogout, 
    IconSearch, 
    IconTrash, 
    IconArrowLeft, 
    IconMinusCircle, 
    IconPlusCircle, 
    IconCheckCircle, 
    IconChevron, 
    IconFileAdd, 
    IconPencil, 
    IconKebab, 
    IconClose, 
    IconCheckSquare, 
    IconCancelSquare, 
    IconChevronDown, 
    IconChevronUp, 
    IconFilter, 
}