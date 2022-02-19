
import styles from '../module-css/body/explorema.module.css'


const ExploreMA = () => {

        return (

                <>
                <div className={styles.root}>
                        <div>
                        
                                <h2 className={styles.h2}>Explore minority apps</h2>
                                <h3 className={styles.h3}>We love NFTs</h3>
                        </div>
                        <div className={styles.main_div}>

                                <div className={styles.main_div_in1}>

                                        <h3>Get in early !!!</h3>
                                        <p>The official NFT drop for creative </p>
                                        <p>and builders promoting diversity</p>

                                        <div>

                                                <button>
                                                        <a href="#">
                                                                Join Our Discord
                                                        </a>
                                                </button>
                                                <span>
                                                        <a>Learn More</a>
                                                </span>
                                        </div>
                                </div>
                                <div className={styles.main_div_in2}>
                                        <div>
                                                <img src="../../assets/images/olabisi/MinorityDropLogo 1.png" />
                                        </div>
                                        <div>
                                                <span>26d</span>
                                                <span>17hr</span>
                                                <span>29m</span>
                                                <span>32s</span>
                                        </div>
                                        <div>
                                                <p>Until the Minority drop mint</p>
                                        </div>
                                
                                </div>
                        
                        </div>
                </div>
                
                <div className={styles.root2}>

                        <div>
                                
                                <img src="../../assets/images/olabisi/GenadropLogo_White_1.png" />
                                       
                        </div>
                        <div>
                                <p>The no code NFT generative 
                                art creator tool & minter.</p>
                                <button>
                                        Get Started
                                </button>
                        </div>
                
                </div>
                </>
        )

}

export default ExploreMA;