import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import { cors_url } from "../../lib/cors_url"
import NavBar from "../nav"
import Footer from "../footer"

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = cors_url("api/auth")
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
        } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            setError(error.response.data.message)
        }
        }
    }
    return (
        <div className={styles.login_container}>
            <NavBar current='login' />
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className={styles.input} />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>Sign In</button>
                    </form>
                    <div className={styles.link}>
                        <span>Haven't created account yet? </span>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Login;