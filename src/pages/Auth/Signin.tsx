import { useState } from "react";
import shield from "../../assets/signin/shelid.png";
import icon from "../../assets/signin/icons.png";
import user from "../../assets/signin/user.png";
import tick from "../../assets/signin/tick.png";
import eye from "../../assets/signin/eye.png";
import lock from "../../assets/signin/lock.png";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import { useAuth } from "../../components/Auth/AuthContext";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const mockResponse = {
        user: { id: 1, email: username, name: "Security User" },
        token: "mock-jwt-token",
      };
      login(mockResponse.user, mockResponse.token);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1E0F0F_0%,#2E1A0F_50%,#19140F_100%)] flex items-center justify-center px-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row  justify-between ">
        <div className="flex-1 flex flex-col justify-between py-3 lg:py-6 px-4 lg:px-4 md:order-1">
          <div>
            <div className="flex items-center gap-3  lg:mb-6">
              <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <div className="absolute top-10 border border-white w-[500px] h-[500px] bg-[#FE9A0033] rounded-full blur-[100px]" />
              </div>
              <div className="w-15 h-15 lg:w-12 lg:h-12 bg-gradient-to-br from-[#FF6900] to-[#FE9A00] rounded-2xl flex items-center justify-center">
                <img
                  src={icon}
                  alt=""
                  className="w-8 h-8 lg:w-auto lg:h-auto"
                />
              </div>

              <div>
                <h1
                  className={`text-white text-lg lg:text-xl font-semibold ${FONTSIZE[36]}`}
                  style={{
                    color: COLORS.primary_white,

                    fontWeight: WEIGHT.seven,
                  }}
                >
                  Skyline Rentals
                </h1>
                <p
                  className={`text-[#FFB86A] text-xs lg:text-sm ${FONTSIZE[14]}`}
                  style={{ fontWeight: WEIGHT.four }}
                >
                  Maintenance Operations
                </p>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="mb-8 lg:mb-8">
                <div
                  className={`${FONTSIZE[48]}`}
                  style={{
                    fontWeight: WEIGHT.seven,
                  }}
                >
                  <h2 className="text-white text-3xl lg:text-5xl font-bold mb-2 ">
                    Keeping Everything
                  </h2>
                  <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-[#FF8904] to-[#FFB900]  bg-clip-text text-transparent">
                    Running Smoothly
                  </h2>
                </div>
                <p
                  className={` text-base lg:text-lg max-w-md ${FONTSIZE[18]}`}
                  style={{
                    color: COLORS.secoundy_gray,

                    fontWeight: WEIGHT.four,
                  }}
                >
                  Comprehensive maintenance management platform for work orders,
                  scheduling, inventory tracking, and repair coordination.{" "}
                </p>
              </div>

              <div className="space-y-3 mb-8 lg:mb-8">
                {[
                  "Work order management & assignment",
                  "Real-time complaint tracking",
                  "Scheduled maintenance calendar",
                  "Inventory & equipment tracking",
                  "Emergency repair coordination",
                  "Performance analytics & reports",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={tick}
                      alt=""
                      className="w-4 h-4 lg:w-auto lg:h-auto"
                    />
                    <span
                      className={`text-gray-300 text-sm lg:text-base ${FONTSIZE[16]}`}
                      style={{
                        color: COLORS.smalltext,

                        fontWeight: WEIGHT.four,
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block border-t-[1.85px] border-t-[#FFFFFF1A]  rounded-2xl p-4 bg-[#FFFFFF0D] backdrop-blur-sm max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3">
              <img
                src={shield}
                alt=""
                className="w-8 h-8 lg:w-auto lg:h-auto"
              />
              <div>
                <h3
                  className={`text-white font-semibold text-sm lg:text-base ${FONTSIZE[16]}`}
                  style={{
                    fontWeight: WEIGHT.seven,
                    color: COLORS.primary_white,
                  }}
                >
                  Professional Maintenance
                </h3>
                <p
                  className={`text-gray-400 text-xs lg:text-sm ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.secoundy_gray,
                  }}
                >
                  Efficient operations, happy residents
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 md:order-2">
          <div className="w-full max-w-md bg-[#FFFFFF0D] rounded-xl border-t-[1.85px] border-t-[#FFFFFF1A]">
            <div className=" rounded-3xl p-6 lg:p-8 border border-[#00000040] shadow-2xl">
              <div className="mb-6 lg:mb-6">
                <h3
                  className={`text-white text-xl lg:text-2xl font-semibold mb-2 ${FONTSIZE[30]}`}
                  style={{
                    fontWeight: WEIGHT.seven,
                    color: COLORS.primary_white,
                  }}
                >
                  Team Login
                </h3>
                <p
                  className={`text-gray-400 text-xs lg:text-sm ${FONTSIZE[16]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.smalltext,
                  }}
                >
                  Access maintenance dashboard
                </p>
              </div>

              {error && (
                <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className={`text-gray-300 text-sm font-medium mb-2 block ${FONTSIZE[14]}`}
                    style={{
                      color: COLORS.smalltext,
                      fontWeight: WEIGHT.seven,
                    }}
                  >
                    Employee ID
                  </label>
                  <div className="relative " style={{ color: COLORS.inbox }}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6A7282]">
                      <img
                        src={user}
                        alt=""
                        className="w-4 h-4 lg:w-auto lg:h-auto"
                      />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="MNT-ID or employee number"
                      className="w-full bg-[#FFFFFF0D] border-t-[1.85px] border-t-[#FFFFFF1A] rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFFFFF1A] focus:ring-2 focus:ring-[#FFFFFF1A] transition-all text-sm lg:text-base  border-[#FFFFFF1A]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`text-gray-300 text-sm font-medium mb-2 block ${FONTSIZE[14]}`}
                    style={{
                      color: COLORS.smalltext,
                      fontWeight: WEIGHT.seven,
                    }}
                  >
                    Access Code
                  </label>
                  <div className="relative" style={{ color: COLORS.inbox }}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6A7282]">
                      <img
                        src={lock}
                        alt=""
                        className="w-4 h-4 lg:w-auto lg:h-auto"
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="Enter your access code"
                      className="w-full bg-[#FFFFFF0D] border-t-[1.85px] border-t-[#FFFFFF1A] rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFFFFF1A] focus:ring-2 focus:ring-[#FFFFFF1A] transition-all text-sm lg:text-base"
                      required
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide access code" : "Show access code"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer "
                    >
                      <img
                        src={eye}
                        alt=""
                        className="w-4 h-4 lg:w-auto lg:h-auto"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="keepSignedIn"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor="keepSignedIn"
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-emerald-800/50 bg-[#FFFFFF0D] backdrop-blur-sm transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-500/20"
                    >
                      <svg
                        className={`h-3 w-3 text-emerald-400 transition-opacity ${
                          keepSignedIn ? "opacity-100" : "opacity-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </label>
                  </div>
                  <label
                    htmlFor="keepSignedIn"
                    className={`text-gray-400 text-xs lg:text-sm cursor-pointer select-none ${FONTSIZE[14]}`}
                    style={{
                      fontWeight: WEIGHT.four,
                      color: COLORS.secoundy_gray,
                    }}
                  >
                    Keep me signed in
                  </label>
                </div>
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-[#FF6900] to-[#FE9A00] hover:from-[#FF6900]/80 hover:to-[#FE9A00]/70 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#FF690040]  text-sm lg:text-base cursor-pointer ${FONTSIZE[16]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.primary_white,
                  }}
                >
                  Sign In to Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="md:hidden px-4 pb-6 space-y-6 ">
          <div className="mb-8">
            <h2
              className={`text-white text-3xl font-bold mb-2 ${FONTSIZE[48]}`}
              style={{
                fontWeight: WEIGHT.seven,
              }}
            >
              Keeping Everything
            </h2>
            <h2
              className={`bg-gradient-to-r from-[#FF8904] to-[#FFB900] bg-clip-text text-transparent text-3xl font-bold mb-4 ${FONTSIZE[48]}`}
              style={{
                fontWeight: WEIGHT.seven,
              }}
            >
              Running Smoothly
            </h2>

            <p
              className={`text-gray-400 text-base ${FONTSIZE[18]}`}
              style={{
                color: COLORS.secoundy_gray,

                fontWeight: WEIGHT.four,
              }}
            >
              Comprehensive maintenance management platform for work orders,
              scheduling, inventory tracking, and repair coordination.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              "Work order management & assignment",
              "Real-time complaint tracking",
              "Scheduled maintenance calendar",
              "Inventory & equipment tracking",
              "Emergency repair coordination",
              "Performance analytics & reports",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <img src={tick} alt="" className="w-4 h-4" />
                <span
                  className={`text-gray-300 text-sm ${FONTSIZE[16]}`}
                  style={{
                    color: COLORS.smalltext,

                    fontWeight: WEIGHT.four,
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="border border-emerald-800/50 rounded-2xl p-4 bg-emerald-950/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img src={shield} alt="" className="w-8 h-8" />
              <div>
                <h3
                  className={`text-white font-semibold text-sm ${FONTSIZE[16]}`}
                  style={{
                    fontWeight: WEIGHT.seven,
                    color: COLORS.primary_white,
                  }}
                >
                  Professional Maintenance
                </h3>
                <p
                  className={`text-gray-400 text-xs ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.secoundy_gray,
                  }}
                >
                  Efficient operations, happy residents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
