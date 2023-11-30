//types
import { Metadata } from 'next';
//libs
import classNames from 'classnames';
//styles
import global from '@/styles/global.module.scss'
import styles from './styles.module.scss'


export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const LoginPage = () => {
  return (
    <div id="about-us" className={styles.container}>
      <div className={styles.content}>
        <h1 className={classNames(styles.title, global.pageTitle)}>
          Welcome!
        </h1>
        <form className={styles.form}>
          <div className={styles.inputBlock}>
            <p className={styles.label}>
              Log In
            </p>
            <input type='text' className={styles.input} />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.label}>
              Password
            </p>
            <input type='password' className={styles.input} />
          </div>
          <input type="submit" value="Sign In" className={classNames(styles.btn, global.primaryButton)} />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
