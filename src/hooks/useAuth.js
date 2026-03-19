import { register, login } from "../utils/api";

function useAuth() {
  async function registerHandler({ name, email, password }) {
    return await register({ name, email, password });
  }

  async function loginHandler({ email, password }) {
    return await login({ email, password });
  }

  return { registerHandler, loginHandler };
}

export default useAuth;
