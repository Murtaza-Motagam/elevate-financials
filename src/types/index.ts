export interface UserFieldProps {
  id?: number | null;
  profileImg?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  username?: string | null;
  mobNo?: string | null;
  status?: string | null;
  email?: string | null;
  role?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accountDetails?: any | null;
}
