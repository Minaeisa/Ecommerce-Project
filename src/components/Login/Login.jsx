
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const formType = params.get('form') || 'login';

  const toggleForm = () => {
    if (formType === 'login') {
      navigate('/pages/login?form=register');
    } else {
      navigate('/pages/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-center text-3xl font-bold text-indigo-600 mb-2">
          {formType === 'register' ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          {formType === 'register'
            ? 'Join us by creating your account.'
            : 'Please enter your details to sign in.'}
        </p>

        <form className="space-y-4">
          {formType === 'register' && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300 text-sm font-medium"
          >
            {formType === 'register' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        <p className="text-sm text-center">
          {formType === 'register' ? (
            <>
              Already have an account?{' '}
              <button onClick={toggleForm} className="text-indigo-600 underline font-medium">
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button onClick={toggleForm} className="text-indigo-600 underline font-medium">
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
