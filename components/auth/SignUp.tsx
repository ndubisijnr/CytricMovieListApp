import Input from "../input/Input"
import Button from "../button/Button"
const SignUpForm = () => {

  return <div className="flex items-center justify-center min-h-screen min-w-full p-5 lg:p-0 md:p-0">

    <div className="lg:w-[300px] md:w-[300px] w-full">
      <h1 className="header-two lg:header-one font-[600] text-center mb-10">Sign in</h1>

      <Input
          type="text"
          inputId="username"
          label="Email"
      />
      <Input
          type="password"
          inputId="username"
          label="Password"
      />

      <div className="flex items-center gap-2 justify-center mb-5">
        <input id="remember-me" type="checkbox" className="w-[18px] h-[17px] bg-[#224957] rounded-[5px]"/>
        <span className="body-small text-white">Remember me</span>
      </div>

      <Button text="Login" classProps=""/>
    </div>

  </div>
};


export default SignUpForm;
