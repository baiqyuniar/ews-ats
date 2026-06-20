import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginService } from "../../services/auth.service";
import { saveUser } from "../../store/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");

      const user = await loginService(email, password);

      saveUser(user);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold shadow-lg">
              EWS
            </div>

            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Early Warning System
              </h1>

              <p className="text-blue-100 text-sm">
                Anak Tidak Sekolah Kabupaten Sleman
              </p>
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-lg mt-16">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-100 mb-4">
              Dinas Pendidikan
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Monitoring Risiko Putus Sekolah Secara Digital
            </h2>

            <p className="text-lg text-blue-50 leading-relaxed">
              Sistem EWS membantu pemerintah daerah dalam memantau,
              menganalisis, dan mengambil tindakan preventif terhadap siswa
              dengan potensi putus sekolah berdasarkan indikator akademik dan
              literasi.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <p className="text-3xl font-bold">12K+</p>

            <p className="text-sm text-blue-100 mt-1">Data Siswa</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <p className="text-3xl font-bold">86</p>

            <p className="text-sm text-blue-100 mt-1">Sekolah</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <p className="text-3xl font-bold">17</p>

            <p className="text-sm text-blue-100 mt-1">Kapanewon</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                EWS
              </div>

              <div>
                <h1 className="font-bold text-slate-800">EWS ATS Sleman</h1>

                <p className="text-sm text-slate-500">Dinas Pendidikan</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-slate-800 mb-3">
              Selamat Datang
            </h2>

            <p className="text-slate-500 leading-relaxed">
              Masuk ke sistem untuk mengakses dashboard monitoring anak tidak
              sekolah Kabupaten Sleman.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Lupa Password?
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="rounded border-slate-300"
                />

                <label htmlFor="remember" className="text-sm text-slate-600">
                  Ingat saya
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 font-semibold transition shadow-lg shadow-blue-200"
              >
                Masuk ke Dashboard
              </button>
            </form>

            {/* Info */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-start gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                  i
                </div>

                <div>
                  <p className="font-semibold text-slate-800 mb-1">
                    Informasi Sistem
                  </p>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Sistem ini digunakan untuk monitoring dan analisis risiko
                    anak tidak sekolah oleh Dinas Pendidikan Kabupaten Sleman.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-500">
            © 2026 Dinas Pendidikan Kabupaten Sleman
          </div>
        </div>
      </div>
    </div>
  );
}
