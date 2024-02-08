import { NextPage } from "next";

const SignUp: NextPage = () => {
  return (
    <div>
      <h1>To do list - Sign Up</h1>
      <form>
        <input type="text" />
        <input type="password" />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
