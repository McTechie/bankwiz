const Login = () => {
    return (  
        <div>
            <form method="post" action="">
            <label for="username">Enter your Username</label>
            <input type="text" name="username" placeholder="Username"/><br/>
            <label for="Password">Password</label>
            <input type="password" name="password" placeholder="Password"/><br/>
            <input type="submit" value="Enter"/>
            <p>Havent registered Yet?</p>
            <a>Sign Up</a>
        </form>
        </div>
    );
}
 
export default Login;