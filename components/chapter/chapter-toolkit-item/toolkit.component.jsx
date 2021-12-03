import styles from './toolkit.module.css';
import Link from 'next/link';

const ToolkitItem = ({ name, image, slug }) => {
    return (
        <div className={styles.container}>
            <Link href={{
                pathname: '/chaptertoolkit/[slug]',
                query: { slug: slug }
            }}>
                <a>
                    <div className={styles.overlay} />
                    <img src={image} alt="icon" />
                    <div className={styles.name}>{name}</div>
                </a>
            </Link>
        </div>
    )
}

export default ToolkitItem;
