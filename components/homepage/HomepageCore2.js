
import styles from '../module-css/body/home_page_coretwo.module.css';


const HomepageCore2 = () => {

        return (

                <>


                <div className={styles.parent}>

                
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6 p-12" style={{ padding: '40px'}}>

                                <div className={styles.hp_first_div} style={{background: '#1C1D37'}}>
                                
                                        <div>
                                        
                                                
                                        </div>
                                        <div className={styles.down_button}>
                                                <button>
                                                        <a href="#">
                                                                play video
                                                        </a>
                                                </button>
                                        </div>
                                        <div className={styles.play_button}>
                                                play button
                                        </div>
                                
                                </div>

                                <div className="flex justify-left text-6xl border-2 border-gray-300 p-12" style={{ padding: "20px"}}>
                                
                                        <h2 className={styles.color_gradient_head}>About Us</h2>
                                        <p className={styles.text_note}>
                                                We are an international network of developers unifying together to build 
                                                socially impactful projects & spread STEM education to marginalized communitie 
                                        </p>

                                        <div className={styles.inner_second_div}>
                                        
                                                <div className="flex-initial w-1/3">
                                                        <p className={styles.inner_second_div_first_p}>Interns</p>
                                                        <p className={styles.color_gradient_number}>500+</p>
                                                </div>
                                                <div className="flex-initial w-1/3">
                                                        <p className={styles.inner_second_div_first_p}>Hackathons</p>
                                                        <p className={styles.color_gradient_number}>200+</p>
                                                </div>
                                                <div className="flex-initial w-1/3">
                                                        <p className={styles.inner_second_div_first_p}>courses</p>
                                                        <p className={styles.color_gradient_number}>500+</p>
                                                </div>

                                        </div>
                                
                                </div>

                        </div>

                
                </div>


                <div style={{ background: "#14152A"}}>
                
                        <h2 className={styles.parent2_h2}>Become a software developer</h2>

                        <p className={styles.parent2_p}>Learn the hottest skills in software + Web3, earn NFT credentials that recruiters from the top technology companies will see through our decentralized talent sourcing system.</p>
                
                </div>
                
                </>
        )
}

export default HomepageCore2;