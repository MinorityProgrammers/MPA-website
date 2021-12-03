import styles from './form.module.css'

export default function Index({ signIn, error,loading, data, name, setName, email, setEmail, password, setPassword, regEmail, submit, handleLogin, handleRegister, ConfirmPassword, setConfirmPassword }){
    return(
        <div className={styles.container}>
            {signIn === false ? 
                (
                <form onSubmit={handleRegister} className={styles.form}>

                    <label htmlFor='email'> email address </label><br />
                    <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

                    {email.trim().length > 0 && email.trim().length < 5 && !regEmail.test(email.trim()) && submit && (<div className={styles.alert}>
                        <p>Email is invalid</p>
                    </div>)}

                    <label htmlFor='name'> full name </label><br />
                    <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor="password">password</label><br />
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

                    {password.trim().length > 0 && password.trim().length < 6 && submit && (<div className={styles.alert}>
                        <p>Password too short (min 6 characters)</p>
                    </div>)}
    
                    <label htmlFor="password">Confirm password</label><br />
                    <input type='password' name='password' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

                    {(password.trim() !== ConfirmPassword.trim()) && submit && (<div className={styles.alert}>
                        <p>Password Don't match</p>
                    </div>)}
                
                    {error && (<div className={styles.alert}>
                        <p>{error.data.message.msg ? error.data.message.msg : ''}</p>
                        <p>{error.data.message.lastName ? error.data.lastName : ''}</p>
                    </div>)}


                    {data && (<div className={styles.sucess}>
                        <p>{data.message}</p>
                    </div>)}
                    {email == '' || name == '' || password == '' || ConfirmPassword == ' ' && submit && (<div className={styles.alert}>
                        <p>All fields are required</p>
                    </div>)}

                    <div className={styles.buttonContainer}>
                        <p><a href="#">forgot password?</a></p>
                        <button className={styles.button} type='submit'> {loading ? 'Registering...' : 'Register'}  </button>
                    </div>
                </form>
                )
                : 
                <form onSubmit={handleLogin} className={styles.form}>

                    <label htmlFor='email'> email address </label><br />
                    <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password">password</label><br />
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                    {error && (<div className={styles.alert}>
                        <p>{error.data.message.msg ? error.data.message.msg : ''}</p>
                    </div>)}

                    {email == '' ||  password == '' && submit && (<div className={styles.alert}>
                        <p>All fields are required</p>
                    </div>)}
                
                    <div className={styles.buttonContainer}>
                        <p><a href="#">forgot password?</a></p>
                        <button className={styles.button} type='submit'> {loading ? 'Signing in...' : 'Sign in'} </button>
                    </div>
                </form> 
            }
            
        </div>
    )
}