import {useState} from 'react';


const SkillsDiv = (props) => {
    return (
        <div className="job-skill tw-flex tw-mb-3" key={props.id}>
            <span className="tw-block tw-w-7 tw-text-white">{props.skill_order}.</span>
            <div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-x-4 tw-mr-2">
                <div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-mr-2">
                    <span className="tw-block tw-text-white">Skill</span>
                    <select name={`job_skill-${props.skill_order}`} required className="tw-block tw-h-9 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white">
                        <option value="html" style={{background:"#151371"}}>HTML</option>
                        <option value="css" style={{background:"#151371"}}>CSS</option>
                        <option value="javascript" style={{background:"#151371"}}>Javascript</option>
                        <option value="react" style={{background:"#151371"}}>React</option>
                        <option value="redux" style={{background:"#151371"}}>Redux</option>
                    </select>
                </div>
                <div className="tw-w-full tw-flex tw-flex-col tw-justify-center">
                    <span className="tw-block tw-text-white">Years</span>
                    <input name={`job_years-${props.skill_order}`} required className="tw-h-9 tw-block focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" type="number" min="1" max="100"/>
                </div>
            </div>
            <button type="button" className="tw-block tw-w-4 tw-h-100 tw-ml-2 tw-text-yellow-300" onClick={()=>props.removeSkill(props.removerInd)}>X</button>
        </div>
    )
}

const JobCreation = () => {
    const [skillsArray,changeSkillsArray]=useState([]);
    const [skillsKey,changeSkillsKey]=useState(0);
                    
    function removeSkill(i) {
        //let nodeIndex=[...document.querySelector(".jobSkills-input").querySelectorAll(".job-skill")].indexOf(e.target.parentNode)
        //console.log(nodeIndex)

        
        changeSkillsArray(skillsArray.filter((_,index)=>i!==index))
    }

    function addSkill(e) {
        if(skillsArray.length<15){
            let newSkillsArray=[...skillsArray,{id:skillsKey}]
            changeSkillsKey(skillsKey+1)
            changeSkillsArray((prevState)=>[...newSkillsArray])

        }
        
    }


    let jobSkills = skillsArray.map((item,index,array)=>
            <SkillsDiv removeSkill={removeSkill} key={item.id} removerInd={index} skill_order={index+1}/>
        )


    return (
        <div className="tw-relative">
            <svg className="jobGuy-img tw-absolute tw-z-0 tw-top-1/4 tw-right-1/2 tw-transform tw--translate-y-1/2 tw-h-4/5" width="624" height="653" viewBox="0 0 624 653" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M623.001 108.281C608.366 122.432 593.666 136.535 579.095 150.766C569.467 160.168 559.871 169.586 550.599 179.327C546.189 183.963 542.877 183.607 538.516 179.31C505.917 147.261 473.221 115.276 440.396 83.4525C435.776 78.9778 436.003 75.8924 440.445 71.5147C463.448 48.8829 486.387 26.1542 509.003 3.15091C514.317 -2.26068 517.435 0.11396 521.538 4.16862C552.748 34.9582 584.038 65.6669 615.328 96.3757C617.816 98.815 620.433 101.093 623.001 103.435C623.001 105.05 623.001 106.666 623.001 108.281Z" fill="white" fillOpacity="0.15"/>
                    <path d="M269.227 283.47C269.227 315.487 269.227 346.68 269.227 377.874C269.227 461.842 269.227 545.827 269.211 629.796C269.211 642.121 264.51 649.423 255.35 651.539C242.637 654.495 232.137 645.837 232.089 631.928C231.976 591.818 232.04 551.723 232.04 511.613C232.04 489.563 232.04 467.513 232.04 444.751C217.809 444.751 204.013 444.751 188.974 444.751C188.974 452.312 188.974 459.775 188.974 467.238C189.006 521.063 189.054 574.904 189.006 628.729C189.006 632.72 188.925 636.952 187.681 640.651C185 648.599 176.939 652.944 168.329 651.943C159.832 650.957 153.241 644.884 152.643 636.128C151.949 625.935 152.11 615.693 152.11 605.468C152.062 501.307 151.965 397.146 152.272 293.001C152.288 285.182 149.816 282.452 142.547 280.707C119.285 275.102 96.1527 268.915 73.1009 262.502C68.6424 261.258 64.0224 258.754 60.6946 255.556C42.2629 237.851 24.1381 219.823 6.04563 201.747C-1.83753 193.88 -1.95061 182.152 5.35101 174.996C12.8626 167.646 23.9281 167.726 32.0859 175.658C47.9168 191.037 63.4085 206.754 79.3687 222.004C82.6964 225.17 87.1226 227.884 91.5327 229.112C114.584 235.557 137.669 241.986 160.995 247.269C169.993 249.304 179.701 248.787 189.054 248.529C196.356 248.319 198.311 251.081 198.004 258.011C196.711 286.507 197.002 315.132 194.434 343.498C192.754 361.962 200.992 375.354 210.846 390.506C218.374 376.242 228.551 364.967 227.146 347.391C224.739 317.377 224.674 287.169 223.543 257.058C223.366 252.228 223.737 248.125 230.086 248.706C261.037 251.517 289.096 238.594 318.464 232.665C332.017 229.935 342.356 223.167 351.58 213.071C363.178 200.374 375.827 188.613 388.104 176.546C397.053 167.759 408.087 167.306 416.002 175.238C423.643 182.879 423.174 193.718 414.516 202.393C397.021 219.904 379.607 237.528 361.644 254.554C357.395 258.576 351.402 261.484 345.716 263.1C320.596 270.143 295.315 276.572 269.227 283.47Z" fill="white" fillOpacity="0.15"/>
                    <path d="M210.708 221.231C181.388 221.295 157.723 197.678 157.787 168.423C157.852 139.475 181.162 116.213 210.255 116.068C239.737 115.923 263.596 139.281 263.709 168.375C263.822 197.42 239.995 221.182 210.708 221.231Z" fill="white" fillOpacity="0.15"/>
                    <path d="M449.115 114.758C450.811 116.018 452.443 116.971 453.768 118.247C470.18 134.191 486.496 150.232 502.956 166.095C506.656 169.649 506.93 172.46 503.086 176.159C493.765 185.109 484.589 194.203 475.624 203.492C471.876 207.369 469.178 206.868 465.576 203.298C449.341 187.176 432.945 171.232 416.533 155.288C413.56 152.397 412.462 149.747 415.806 146.404C425.53 136.727 435.19 126.97 444.947 117.31C446.046 116.244 447.613 115.662 449.115 114.758Z" fill="white" fillOpacity="0.15"/>
            </svg>
            <div className="jobCreation-lineArt tw-mb-1 tw-h-2 tw-bg-yellow-500 tw-w-3/5 sm:tw-w-1/2 md:tw-w-2/5 lg:tw-w-1/3 xl:tw-w-3/8 tw-mx-auto tw-rounded-md"></div>
            <form className="job-create-form tw-w-11/12 sm:tw-w-3/4 md:tw-w-3/5 lg:tw-w-1/2 xl:tw-w-5/12 tw-mx-auto tw-bg-black tw-bg-white tw-bg-opacity-25 tw-p-10 tw-rounded-3xl tw-relative tw-z-10">
                <header className="tw-text-white tw-text-center tw-text-2xl tw-font-bold tw-mb-8">Create a New Job</header>
                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Job Title <span className="tw-text-xl tw-text-yellow-200">*</span></label>
                    <input name="job_title" required className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" type="text" placeholder="Add a short, descriptive job title"/>
                </div>
                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Job Location</label>
                    <input name="location" className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" type="text" placeholder="Specific addresses help you reach nearby candidates"/>
                </div>
                
                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                    <span className="tw-block tw-text-white lg:tw-text-lg tw-mb-1 tw-font-bold">Job Remote? <span className="tw-text-xl tw-text-yellow-200">*</span></span>
                    <div className="tw-flex tw-justify-start tw-flex-wrap">
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="remote" required type="radio" value={true} className="jobType-checkbox tw-mr-1"/><span className="jobType-custom-checkbox"></span>Yes</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="remote" type="radio" value={false} className="jobType-checkbox tw-mr-1"/><span className="jobType-custom-checkbox"></span>No</label>
                    </div>
                </div>

                <div className="tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Industry <span className="tw-text-xl tw-text-yellow-200">*</span></label>
                    <div>
                        <select name="job_industry" required className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white">
                            <option style={{background:"#151371"}}>Art</option>
                            <option style={{background:"#151371"}}>Automotive</option>
                            <option style={{background:"#151371"}}>Medical</option>
                            <option style={{background:"#151371"}}>Science</option>
                            <option style={{background:"#151371"}}>Technology</option>
                        </select>
                    </div>
                </div>

                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                    <span className="tw-block tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Job Type <span className="tw-text-xl tw-text-yellow-200">*</span></span>
                    {/*<div className="tw-flex tw-justify-start tw-flex-wrap">
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Full-Time</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Part-Time</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Contract</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Internship</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Temporary</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Seasonal</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Freelance</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="job_type" type="radio" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Volunteer</label>
                    </div>*/}
                    <div>
                        <select name="job_type" className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white">
                            <option style={{background:"#151371"}}>Full-Time</option>
                            <option style={{background:"#151371"}}>Part-Time</option>
                            <option style={{background:"#151371"}}>Contract</option>
                            <option style={{background:"#151371"}}>Industry</option>
                            <option style={{background:"#151371"}}>Temporary</option>
                            <option style={{background:"#151371"}}>Seasonal</option>
                            <option style={{background:"#151371"}}>Freelance</option>
                            <option style={{background:"#151371"}}>Volunteer</option>
                        </select>
                    </div>
                </div>

                <div className="form-input-group tw-flex tw-flex-col">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Job Skills <span className="tw-text-sm tw-font-normal">(Max 15)</span></label>
                    
                    <div className="jobSkills-input">
                        {jobSkills}
                    </div>
                    <button type="button" className="tw-text-white tw-mb-3" onClick={(e)=>addSkill(e)}>Add Skill</button>
                    
                </div>


                <div className="tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Job Description <span className="tw-text-xl tw-text-yellow-200">*</span></label>
                    <textarea name="job_description" required rows="6" className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" placeholder="Describe the responsibilities and preferred skills for this job"></textarea>
                </div>
                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Fulfill Role By</label>
                    <input name="fulfull_role_by" type="date" className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent"/> 
                </div>


                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Salary <span className="tw-text-xl tw-text-yellow-200">*</span></label>
                    <input name="pay" required className="tw-text-white focus:tw-outline-none focus:tw-ring-2 tw-mb-1 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" placeholder="Enter Annual Salary" type="text"/> 
                    <div className="tw-flex tw-justify-start tw-flex-wrap">
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="pay_interval" required type="radio" value="annually" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Annually</label>
                        <label className="jobType-label tw-text-white tw-mr-5 tw-mb-0"><input name="pay_interval" type="radio" value="hourly" className="jobType-checkbox tw-mr-1" /><span className="jobType-custom-checkbox"></span>Hourly</label>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Additional Compensation</label>
                    <textarea name="additional_compensation" rows="6" className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" placeholder="List any additional compensation offered"></textarea>
                </div>

                <div className="tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Benefits</label>
                    <textarea rows="6" className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" placeholder="Add benefits, separated by commas"></textarea>
                </div>

                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">Weekly Work Hours</label>
                    <input className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80" type="number" min="1" placeholder="Enter Number of Weekly Hours"/>
                </div>
                <input method="GET" action="/" className="tw-block tw-mx-auto tw-py-1 tw-px-8 tw-mt-5 tw-text-white tw-font-bold tw-tracking-wide" style={{background:"#151371"}} type="submit" value="Create Job"/>
            </form>
        </div>
    )
}

export default JobCreation;