export default function Button({children, textOnly, className}) {
    let cssClass = textOnly ? 'text-button'  : 'button';
    cssClass += ' ' + className
    return <button className={cssClass}>{children}</button>
}