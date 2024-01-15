import instance from "@/utils/instance";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

type LoginParams = {
  code: string;
};

const login = async (data: LoginParams) =>
  (await instance.post(`login`, data)).data;

const useLogin = () => {
  const router = useRouter();
  const loginMutation = useMutation((data: LoginParams) => login(data), {
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("expiresIn", data.expiresIn);
      localStorage.setItem("refreshToken", data.refreshToken);
      router.push("/");
    },
    onError: () => {
      router.push("/error");
    },
  });

  return {
    loginMutate: loginMutation.mutate,
  };
};

export default useLogin;
