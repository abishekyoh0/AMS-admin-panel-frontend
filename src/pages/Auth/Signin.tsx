import { useState, useRef } from "react";
import shield from "../../assets/signin/setting.png";
import admin from "../../assets/signin/admin.png";
import user from "../../assets/signin/user.png";
import tick from "../../assets/signin/tickadmin.png";
import eye from "../../assets/signin/eye.png";
import lock from "../../assets/signin/lock.png";
import { COLORS, FONTSIZE, WEIGHT } from "../../constent/uiconstent";
import { useAuth } from "../../components/Auth/AuthContext";
import top from "../../assets/signin/topimg.png";
import orange from "../../assets/signin/orange.png";
import { toast } from "react-toastify";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { login } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setStep("otp");
    toast.success("OTP sent successfully!");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      if (index + i < 6) newOtp[index + i] = pasted[i];
    }
    setOtp(newOtp);
    otpRefs.current[Math.min(index + pasted.length, 5)]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }

    toast.success("OTP verified successfully!");

    try {
      const mockResponse = {
        user: { id: 1, email: username, name: "Security User" },
        token: "mock-jwt-token",
      };
      login(mockResponse.user, mockResponse.token);
    } catch (err) {
      setError("Invalid OTP");
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    otpRefs.current[0]?.focus();
    toast.info("OTP has been resent to your email.");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(#0F1A1E,#0F2A2E,#141E1E)] flex items-center justify-center px-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        <div className="flex-1 flex flex-col justify-between py-3 lg:py-3 px-4 lg:px-4 md:order-1">
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-3 lg:mb-2">
              <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <div className="absolute top-10 border border-white w-[500px] h-[500px] bg-[#00BBA733] rounded-full blur-[100px]" />
              </div>
              <div className="relative inline-block">
                <div className="w-15 h-15 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-linear-to-br from-[#00B8DB] to-[#00BBA7] rounded-2xl flex items-center justify-center">
                  <img
                    src={admin}
                    alt="admin"
                    className="w-8 h-8 md:w-6 md:h-6 lg:w-auto lg:h-auto"
                  />
                </div>
                <img
                  src={orange}
                  alt="tick"
                  className="absolute -top-2 -right-2 w-5 h-5 lg:w-6 lg:h-6"
                />
              </div>
              <div>
                <h1
                  className={`text-white text-lg md:text-xl lg:text-4xl font-semibold ${FONTSIZE[35]}`}
                  style={{
                    color: COLORS.primary_white,
                    fontWeight: WEIGHT.seven,
                  }}
                >
                  Skyline Rentals
                </h1>
                <p
                  className={`text-[#53EAFD] text-xs lg:text-sm ${FONTSIZE[14]}`}
                  style={{ fontWeight: WEIGHT.four }}
                >
                  Administrator Console
                </p>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="mb-4 md:mb-3 lg:mb-2">
                <div
                  className={`${FONTSIZE[40]}`}
                  style={{ fontWeight: WEIGHT.seven }}
                >
                  <h2 className="text-white text-xl md:text-2xl lg:text-4xl font-bold mb-2">
                    Complete Control
                  </h2>
                  <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-3 lg:mb-2 bg-linear-to-r from-[#00D3F3] to-[#00D5BE] bg-clip-text text-transparent">
                    Of Your Platform
                  </h2>
                </div>
                <p
                  className={`text-sm md:text-xs lg:text-lg max-w-md ${FONTSIZE[16]}`}
                  style={{
                    color: COLORS.secoundy_gray,
                    fontWeight: WEIGHT.four,
                  }}
                >
                  Master dashboard with comprehensive control over buildings,
                  users, complaints, visitors, invoices, and emergency
                  management.
                </p>
              </div>

              <div className="space-y-3 md:space-y-1.5 lg:space-y-3 mb-4 md:mb-3 lg:mb-3">
                {[
                  "Complete system administration",
                  "User & role management",
                  "Building & unit configuration",
                  "Advanced analytics & reporting",
                  "Emergency control center",
                  "System-wide notifications",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={tick}
                      alt=""
                      className="w-4 h-4 lg:w-auto lg:h-auto shrink-0"
                    />
                    <span
                      className={`text-gray-300 text-xs md:text-xs lg:text-base ${FONTSIZE[16]}`}
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

          <div className="mt-1 hidden md:block border-t-[1.85px] border-t-[#FFFFFF1A] rounded-2xl p-3 md:p-3 lg:p-4 bg-[#FFFFFF0D] backdrop-blur-sm w-full lg:max-w-md lg:mx-0">
            <div className="flex items-center gap-3">
              <img
                src={shield}
                alt=""
                className="w-6 h-6 md:w-6 md:h-6 lg:w-auto lg:h-auto"
              />
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src={top}
                    alt="admin"
                    className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5"
                  />
                  <h3
                    className={`text-white font-semibold text-xs md:text-xs lg:text-base ${FONTSIZE[16]}`}
                    style={{
                      fontWeight: WEIGHT.seven,
                      color: COLORS.primary_white,
                    }}
                  >
                    Administrator Access
                  </h3>
                </div>
                <p
                  className={`text-gray-400 text-xs ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.secoundy_gray,
                  }}
                >
                  Protected with two-factor authentication
                </p>
              </div>
            </div>
          </div>

          <div className="hidden mt-2 md:block border-t-[1.85px] border-t-[#FDC7004D] rounded-2xl p-4 md:p-2.5 lg:p-4 bg-[#F0B1001A] backdrop-blur-sm max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3">
              <img
                src={top}
                alt=""
                className="w-6 h-6 md:w-6 md:h-6 lg:w-auto lg:h-auto"
              />
              <div>
                <h3
                  className={`text-white font-semibold text-xs md:text-xs lg:text-base ${FONTSIZE[16]}`}
                  style={{
                    fontWeight: WEIGHT.seven,
                    color: COLORS.primary_white,
                  }}
                >
                  Enhanced Security
                </h3>
                <p
                  className={`text-gray-400 text-xs lg:text-sm ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.secoundy_gray,
                  }}
                >
                  All admin sessaions are monitored and logged for security
                  purposes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-3 lg:p-8 md:order-2">
          <div className="w-full max-w-md md:max-w-sm lg:max-w-md bg-[#FFFFFF0D] rounded-xl border-t-[1.85px] border-t-[#FFFFFF1A]">
            <div className="rounded-3xl p-5 md:p-5 lg:p-8 border border-[#00000040] shadow-2xl">
              {step === "login" ? (
                <>
                  <div className="mb-5 lg:mb-6">
                    <h3
                      className={`text-white text-xl lg:text-2xl font-semibold mb-2 ${FONTSIZE[30]}`}
                      style={{
                        fontWeight: WEIGHT.seven,
                        color: COLORS.primary_white,
                      }}
                    >
                      Admin Access
                    </h3>
                    <p
                      className={`text-gray-400 text-xs lg:text-sm ${FONTSIZE[16]}`}
                      style={{
                        fontWeight: WEIGHT.four,
                        color: COLORS.smalltext,
                      }}
                    >
                      Restricted administrator access
                    </p>
                  </div>

                  {error && (
                    <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <form
                    onSubmit={handleLoginSubmit}
                    className="space-y-4 md:space-y-4 lg:space-y-6"
                  >
                    <div>
                      <label
                        className={`text-gray-300 text-sm font-medium mb-2 block ${FONTSIZE[14]}`}
                        style={{
                          color: COLORS.smalltext,
                          fontWeight: WEIGHT.seven,
                        }}
                      >
                        Admin Username
                      </label>
                      <div className="relative" style={{ color: COLORS.inbox }}>
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
                          placeholder="Administrator username"
                          className="w-full bg-[#FFFFFF0D] border-t-[1.85px] border-t-[#FFFFFF1A] rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF1A] transition-all text-sm lg:text-base border border-[#FFFFFF1A]"
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
                        Admin Password
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
                          placeholder="Enter admin password"
                          className="w-full bg-[#FFFFFF0D] border-t-[1.85px] border-t-[#FFFFFF1A] rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF1A] transition-all text-sm lg:text-base"
                          required
                        />
                        <button
                          type="button"
                          aria-label={
                            showPassword
                              ? "Hide access code"
                              : "Show access code"
                          }
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
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
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-[#00B8DBAA] bg-[#FFFFFF0D] backdrop-blur-sm transition-all peer-checked:border-[#00B8DB] peer-checked:bg-[#00B8DB]/10"
                        >
                          <svg
                            className={`h-3 w-3 text-emerald-400 transition-opacity ${keepSignedIn ? "opacity-100" : "opacity-0"}`}
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
                        Remember me
                      </label>
                    </div>

                    <button
                      type="submit"
                      className={`w-full bg-linear-to-r from-[#00B8DB] to-[#00BBA7] hover:from-[#00B8DB]/80 hover:to-[#00BBA7]/70 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#00B8DB40] text-sm lg:text-base cursor-pointer ${FONTSIZE[16]}`}
                      style={{
                        fontWeight: WEIGHT.four,
                        color: COLORS.primary_white,
                      }}
                    >
                      Continue to 2FA Verfication
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-4 md:mb-3 lg:mb-6">
                    <h3
                      className={`text-white text-xl lg:text-2xl font-semibold mb-1 ${FONTSIZE[30]}`}
                      style={{
                        fontWeight: WEIGHT.seven,
                        color: COLORS.primary_white,
                      }}
                    >
                      Sign In
                    </h3>
                    <p
                      className={`text-gray-400 text-xs lg:text-sm mb-4 lg:mb-6 ${FONTSIZE[16]}`}
                      style={{ fontWeight: WEIGHT.four, color: COLORS.grey }}
                    >
                      Access your resident dashboard
                    </p>

                    <div className="rounded-2xl p-3 md:p-3 lg:p-5 text-center">
                      <h4
                        className={`text-white font-semibold text-base mb-1 ${FONTSIZE[22]}`}
                        style={{
                          fontWeight: WEIGHT.six,
                          color: COLORS.primary_white,
                        }}
                      >
                        OTP Verification
                      </h4>
                      <p
                        className={`text-gray-400 text-xs ${FONTSIZE[16]}`}
                        style={{ color: COLORS.grey, fontWeight: WEIGHT.four }}
                      >
                        We will send you a One-Time password on this Email
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <form
                    onSubmit={handleOtpSubmit}
                    className="space-y-4 md:space-y-4 lg:space-y-6"
                  >
                    <div>
                      <label
                        className={`text-gray-300 text-sm font-medium mb-3 block ${FONTSIZE[14]}`}
                        style={{
                          color: COLORS.smalltext,
                          fontWeight: WEIGHT.seven,
                        }}
                      >
                        Enter Otp
                      </label>
                      <div className="flex gap-1.5 md:gap-1.5 lg:gap-2 justify-between">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              otpRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            onPaste={(e) => handleOtpPaste(e, index)}
                            className="flex-1 min-w-0 aspect-square text-center text-white text-base md:text-sm lg:text-lg font-semibold bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B8DB] transition-all"
                            style={{ caretColor: "#00B8DB" }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span
                        className={`${FONTSIZE[12]}`}
                        style={{
                          fontWeight: WEIGHT.four,
                          color: COLORS.secoundy_gray,
                        }}
                      >
                        Do not send OTP ?
                      </span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className={`text-[#0BA9E4] hover:text-[#0BA9E4] transition-colors font-medium cursor-pointer ${FONTSIZE[12]}`}
                        style={{ fontWeight: WEIGHT.four }}
                      >
                        ReSend OTP
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("login");
                          setError("");
                          setOtp(["", "", "", "", "", ""]);
                        }}
                        className={`flex-1 border border-[#FFFFFF1A] bg-[#FFFFFF0D] hover:bg-[#FFFFFF1A] text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm lg:text-base cursor-pointer ${FONTSIZE[16]}`}
                        style={{
                          fontWeight: WEIGHT.seven,
                          color: COLORS.primary_white,
                        }}
                      >
                        ← Sign In
                      </button>
                      <button
                        type="submit"
                        className={`flex-1 bg-linear-to-r from-[#00B8DB] to-[#00BBA7] hover:from-[#00B8DB]/80 hover:to-[#00BBA7]/70 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#00B8DB40] text-sm lg:text-base cursor-pointer ${FONTSIZE[16]}`}
                        style={{
                          fontWeight: WEIGHT.seven,
                          color: COLORS.primary_white,
                        }}
                      >
                        Confirm OTP
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden px-4 pb-6 space-y-6">
          <div className="mb-8">
            <h2
              className={`text-white text-3xl font-bold mb-2 ${FONTSIZE[48]}`}
              style={{ fontWeight: WEIGHT.seven }}
            >
              Complete Control
            </h2>
            <h2
              className={`bg-linear-to-r from-[#00D3F3] to-[#00D5BE] bg-clip-text text-transparent text-3xl font-bold mb-4 ${FONTSIZE[48]}`}
              style={{ fontWeight: WEIGHT.seven }}
            >
              Of Your Platform
            </h2>
            <p
              className={`text-gray-400 text-base ${FONTSIZE[18]}`}
              style={{ color: COLORS.secoundy_gray, fontWeight: WEIGHT.four }}
            >
              Master dashboard with comprehensive control over buildings, users,
              complaints, visitors, invoices, and emergency management.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
             "Complete system administration",
                  "User & role management",
                  "Building & unit configuration",
                  "Advanced analytics & reporting",
                  "Emergency control center",
                  "System-wide notifications",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <img src={tick} alt="" className="w-4 h-4" />
                <span
                  className={`text-gray-300 text-sm ${FONTSIZE[16]}`}
                  style={{ color: COLORS.smalltext, fontWeight: WEIGHT.four }}
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
                 Administrator Access
                </h3>
                <p
                  className={`text-gray-400 text-xs ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.secoundy_gray,
                  }}
                >
                 Protected with two-factor authentication
                </p>
              </div>
            </div>
          </div>

          <div className="border-t-[1.85px] border-t-[#FDC7004D] rounded-2xl p-4 bg-[#F0B1001A] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img src={top} alt="" className="w-8 h-8" />
              <div>
                <h3
                  className={`text-white font-semibold text-sm ${FONTSIZE[16]}`}
                  style={{
                    fontWeight: WEIGHT.seven,
                    color: COLORS.primary_white,
                  }}
                >
                  Enhanced Security
                </h3>
                <p
                  className={`text-gray-400 text-xs ${FONTSIZE[14]}`}
                  style={{
                    fontWeight: WEIGHT.four,
                    color: COLORS.secoundy_gray,
                  }}
                >
                  All admin sessaions are monitored and logged for security
                  purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
