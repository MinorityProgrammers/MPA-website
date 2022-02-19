
import styles from '../module-css/body/corePrinciples.module.css'

const HomeCorePrinciples = () => {

        return (
                <div className={styles.root}>
                        <br />
                        <br />
                        <br />
                        <div>
                                <h2>Our core principles</h2>
                        </div>
                        <div className={styles.flex_con}>

                                <div>
                                        <div className={styles.flex_con_img}>
                                                <img src="../../assets/images/olabisi/cp1.png" width={100} height={100} />
                                        </div>
                                        <div>
                                                <h3 className={styles.h3}>Code</h3>
                                        </div>
                                        <div>
                                                <p>
                                                With our professional team driven experience, We focus on shipping industry grade  products that  solves real world problems

                                                </p>
                                        </div>
                                </div>

                                <div>
                                        <div className={styles.flex_con_img}>
                                                <img src="../../assets/images/olabisi/cp2.png" width={100} height={100} />
                                        </div>
                                        <div>
                                                <h3 className={styles.h3}>Culture</h3>
                                        </div>
                                        <div>
                                                <p>
                                                We encourage inclusivity and motivate our students and employees to think outside the box and  become excellent collaborators
                                                </p>
                                        </div>
                                </div>

                                <div>
                                        <div className={styles.flex_con_img}>
                                                <img src="../../assets/images/olabisi/cp3.png" width={100} height={100} />
                                        </div>
                                        <div>
                                                <h3 className={styles.h3}>Community</h3>
                                        </div>
                                        <div>
                                                <p>
                                                We strive to build a supportive community for developers to engage , share knowledge, motivate and grow into valuable assests.
                                                </p>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}


export default HomeCorePrinciples;