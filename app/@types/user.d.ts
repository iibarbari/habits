type TSignUp = {
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
};

type TLogin = Omit<TSignUp, 'confirmPassword' | 'name'>;

type TUser = {
  email: string
  name: string
  uid: string,
}
