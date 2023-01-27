// css
import classes from './FiveStarRating.module.css';

function FiveStarRating({ rating }) {
    switch (rating) {
        case 0:
            return (
                <div className={classes.wrap}>
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                </div>
            )
        case 1:
            return (
                <div className={classes.wrap}>
                    <StarIcon active={true} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                </div>
            )
        case 2:
            return (
                <div className={classes.wrap}>
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                </div>
            )
        case 3:
            return (
                <div className={classes.wrap}>
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={false} />
                    <StarIcon active={false} />
                </div>
            )
        case 4:
            return (
                <div className={classes.wrap}>
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={false} />
                </div>
            )
        case 5:
            return (
                <div className={classes.wrap}>
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                    <StarIcon active={true} />
                </div>
            )
    }
}

function StarIcon({ active }) {
    const cn = active ? [classes.icon, classes.active].join(' ') : classes.icon;
    
    return (
        <svg 
            className={cn} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" stroke="white" strokeWidth="1" />
        </svg>
    )
}

export {
    FiveStarRating, 
}