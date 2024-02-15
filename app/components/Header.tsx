import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const Header: FC = () => {
  const [account, setAccount] = useState<string>("");

  const getMe = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.get<string>(
        `${process.env.NEXT_PUBLIC_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAccount(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <header className="flex">
      {account && <div className="mr-4">{account}님 환영합니다!</div>}
      <div>
        <Link className="btn-style" href="/sign-in">
          로그인
        </Link>
        <Link className="btn-style ml-2" href="/sign-up">
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
