import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthRedirect } from "../../../hooks/useAuthRedirect";
import { useAppContext } from "../../../context/app/AppContext";
import RotaryDial from "../../base/RotaryDial";

const LoginPage: FC = () => {
  const { redirectIfLoggedIn } = useAuthRedirect();

  useEffect(() => {
    redirectIfLoggedIn();
  }, [redirectIfLoggedIn]);

  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  const validateEmailPattern = (emailStr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value.length > 0 && validateEmailPattern(value)) {
      setEmailError({
        show: true,
        message: `InvalidEmailFormatException: Email address "${value}" does not comply with RFC 5322 specification. Expected format: <local-part>@<domain>.<tld>`,
      });
    } else {
      setEmailError({ show: false, message: "" });
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleLogin = () => {
    console.log(email);
    console.log(password);
    if (!email.length || !password.length) {
      return;
    }
    if (password !== "1234") {
      return;
    }
    console.log(password);
    setUser({
      name: "Adam Herout",
      email: "adam@vutbr.cz",
      password: "12345678",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .1) 25%, rgba(0, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .1) 75%, rgba(0, 255, 255, .1) 76%, transparent 77%, transparent),
                        linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .1) 25%, rgba(0, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .1) 75%, rgba(0, 255, 255, .1) 76%, transparent 77%, transparent)`,
            backgroundSize: "50px 50px",
            animation: "drift 20s linear infinite",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-32 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-transparent bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text mb-2">
              BUT.SYSTEM.LOGIN
            </h1>
            <p className="text-xs text-slate-500 font-mono tracking-widest">
              &gt; ENCRYPTED ACCESS REQUIRED
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-8">
            <label className="block font-mono text-xs text-slate-400 mb-3 uppercase tracking-widest">
              Email Identity
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="user@domain.net"
              className="w-full px-4 h-12 bg-slate-850 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono text-sm"
            />
          </div>

          {/* Rotary Password Field */}
          <RotaryDial
            onDigitDialed={(digit) => {
              if (digit === -1) {
                if (!password.length) {
                  return;
                }
                setPassword((v) => v.slice(0, -1));
                return;
              }
              setPassword((v) => v + digit);
            }}
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 px-6 bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold uppercase tracking-widest rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/50 mt-4"
          >
            Authenticate
          </button>

          {/* Footer */}
          <p className="text-center text-slate-600 text-xs mt-8 font-mono">
            &gt; SECURITY LEVEL: MAXIMUM INCONVENIENCE
          </p>
        </div>
      </div>

      {/* Error Dialog */}
      {emailError.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4"
          onClick={() => setEmailError({ show: false, message: "" })}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-red-950/90 border border-red-500/50 rounded-lg shadow-xl max-w-md w-full overflow-hidden backdrop-blur-sm"
          >
            <div className="px-6 pt-5 pb-3 border-b border-red-500/30 bg-red-950/50">
              <h3 className="font-semibold text-red-400 font-mono text-sm">
                ❌ EXCEPTION THROWN
              </h3>
            </div>

            <div className="p-6">
              <p className="text-xs text-red-300 font-mono leading-relaxed wrap-break-word">
                {emailError.message}
              </p>
            </div>

            <div className="px-6 py-3 border-t border-red-500/30 bg-red-950/50 flex justify-end">
              <button
                onClick={handleReload}
                className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors font-mono"
              >
                RESTART_SYSTEM()
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .bg-slate-850 {
          background-color: rgb(15, 23, 42, 0.5);
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
