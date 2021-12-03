import styles from './mapGuide.module.css';

const MapGuide = ({ categories }) => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>Chapter Type</div>
            {
                categories && categories.map(({ _id, LocationLogo, chapter_type }) => (
                    <div key={_id} className={styles.iconAndName}>
                        <div className={styles.icon}>
                            <img src={LocationLogo} alt="icon" />
                        </div>
                        <div className={styles.name}>{chapter_type}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default MapGuide;