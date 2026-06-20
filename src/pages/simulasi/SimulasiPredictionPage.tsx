import { useEffect, useState } from "react";
import Select from "react-select";

import DashboardLayout from "../../layouts/DashboardLayout";

import { schoolList } from "../../data/schoolList";
import { schoolDetails } from "../../data/schoolDetail";

import {
  Brain,
  AlertTriangle,
  BookOpen,
  Calculator,
  FlaskConical,
} from "lucide-react";

export default function SimulationPredictionPage() {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const [literasi, setLiterasi] = useState(40);
  const [numerasi, setNumerasi] = useState(50);
  const [sains, setSains] = useState(60);

  const [result, setResult] = useState<number | null>(null);

  const schoolDetail = schoolDetails.find(
    (s) => s.schoolId === Number(selectedSchool),
  );

  const students = schoolDetail?.students ?? [];
  const studentOptions = students.map((student) => ({
    value: student.id,
    label: `${student.nisn} - ${student.nama}`,
  }));

  const selectedStudentData = students.find(
    (s) => s.id === Number(selectedStudent),
  );

  useEffect(() => {
    if (selectedStudentData) {
      setLiterasi(selectedStudentData.literasi);

      setNumerasi(selectedStudentData.numerasi);

      setSains(
        Math.round(
          (selectedStudentData.literasi + selectedStudentData.numerasi) / 2,
        ),
      );
    }
  }, [selectedStudentData]);

  const handlePredict = () => {
    /**
     * dummy prediction
     * ganti API ML nanti
     */

    const score = 100 - (literasi * 0.3 + numerasi * 0.4 + sains * 0.3);

    setResult(Number(score.toFixed(1)));
  };

  const getStatus = () => {
    if (result === null) return "-";

    if (result >= 75) return "Risiko Tinggi";

    if (result >= 50) return "Risiko Sedang";

    return "Risiko Rendah";
  };

  const getStatusColor = () => {
    if (result === null) return "bg-slate-400";

    if (result >= 75) return "bg-red-500";

    if (result >= 50) return "bg-yellow-500";

    return "bg-green-500";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid xl:grid-cols-2 gap-6">
          {/* FORM */}

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="text-blue-600" />

              <h3 className="font-semibold text-lg">Data Input</h3>
            </div>

            <div className="space-y-5">
              {/* SEKOLAH */}

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Sekolah
                </label>

                <select
                  value={selectedSchool}
                  onChange={(e) => {
                    setSelectedSchool(e.target.value);

                    setSelectedStudent("");
                    setResult(null);
                  }}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300"
                >
                  <option value="">Pilih Sekolah</option>

                  {schoolList.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* SISWA */}

              <div>
                <label className="block mb-2 text-sm font-medium">Siswa</label>

                <Select
                  isDisabled={!selectedSchool}
                  placeholder="Cari NISN atau Nama Siswa..."
                  options={studentOptions}
                  value={
                    studentOptions.find(
                      (option) => option.value === Number(selectedStudent),
                    ) || null
                  }
                  onChange={(option) =>
                    setSelectedStudent(option ? String(option.value) : "")
                  }
                />
              </div>

              {/* INFO SISWA */}

              {selectedStudentData && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500">NISN</p>

                      <p className="font-semibold">
                        {selectedStudentData.nisn}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Kelas</p>

                      <p className="font-semibold">
                        {selectedStudentData.kelas}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <ScoreInput
                label="Literasi"
                value={literasi}
                setValue={setLiterasi}
                icon={<BookOpen size={18} />}
              />

              <ScoreInput
                label="Numerasi"
                value={numerasi}
                setValue={setNumerasi}
                icon={<Calculator size={18} />}
              />

              <ScoreInput
                label="Sains"
                value={sains}
                setValue={setSains}
                icon={<FlaskConical size={18} />}
              />

              <button
                disabled={!selectedStudent}
                onClick={handlePredict}
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
              >
                Jalankan Prediksi
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="font-semibold text-blue-700">Variabel Prediksi</p>

                <ul className="mt-2 text-sm text-slate-700 space-y-1">
                  <li>• Literasi</li>
                  <li>• Numerasi</li>
                  <li>• Sains</li>
                  <li>• Riwayat akademik</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RESULT */}

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-500" />

              <h3 className="font-semibold text-lg">Hasil Prediksi</h3>
            </div>

            {result === null ? (
              <div className="h-full flex items-center justify-center text-slate-400">
                Pilih siswa lalu jalankan simulasi
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-slate-500">Probabilitas Risiko ATS</p>

                  <h2 className="text-6xl font-bold mt-3">{result}%</h2>

                  <span
                    className={`inline-block mt-4 px-4 py-2 rounded-full text-white ${getStatusColor()}`}
                  >
                    {getStatus()}
                  </span>
                </div>

                <div>
                  <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={getStatusColor()}
                      style={{
                        width: `${result}%`,
                        height: "100%",
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Faktor Dominan</h4>

                  <div className="space-y-3">
                    <FactorBar label="Numerasi" value={70} />

                    <FactorBar label="Literasi" value={55} />

                    <FactorBar label="Sains" value={35} />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Rekomendasi Intervensi</h4>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li>✓ Tingkatkan latihan numerasi</li>

                      <li>✓ Monitoring kehadiran mingguan</li>

                      <li>✓ Pendampingan belajar intensif</li>

                      <li>✓ Evaluasi ulang dalam 30 hari</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ScoreInput({
  label,
  value,
  setValue,
  icon,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}

          <span className="font-medium">{label}</span>
        </div>

        <span className="font-bold">{value}</span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function FactorBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>

        <span>{value}%</span>
      </div>

      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}
