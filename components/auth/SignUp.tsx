import Input from "../input/Input"
import Button from "../button/Button"
const SignUpForm = () => {
  return <div className="flex items-center justify-center min-h-screen min-w-full">

    <div className="lg:w-[300px]">
      <h1 className="text-[64px] font-[600] leading-[80px] text-center mb-10">Sign in</h1>

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
        <span className="text-[14px] font-[400] leading-[24px] text-white">Remember me</span>
      </div>

      <Button text="Login" classProps=""/>
    </div>

  </div>
};


export default SignUpForm;
