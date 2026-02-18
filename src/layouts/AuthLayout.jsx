import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="relative z-10">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
