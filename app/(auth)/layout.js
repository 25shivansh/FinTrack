const AuthLayout = ({ children }) => {
    return <div className='flex justify-center pt-40'>
        {children}
    </div>
}
export default AuthLayout;
// This layout is used for authentication pages like sign-in and sign-up