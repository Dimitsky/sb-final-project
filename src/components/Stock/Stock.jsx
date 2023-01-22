// css 
import classes from './stock.module.css';

function Stock({ className, stock }) {
    const cn = className ? [classes.stockWrap, className].join(' ') : classes.stockWrap;

    // render
    const render = () => {
        if (stock) {
            return (
                <span className={cn}>В наличии <span className={classes.stockInner}>({stock})</span></span>
            );
        } else {
            return (
                <span className={cn}>Нет в наличии</span>
            );
        }
    }

    return render();
}

export {
    Stock, 
}