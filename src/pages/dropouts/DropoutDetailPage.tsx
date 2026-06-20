import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { User, School, MapPin, AlertTriangle, CheckCircle } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getDropoutById, verifyDropout } from "../../services/dropout.service";
import { getRecommendedOPD } from "../../helpers/opd.helper";
import {
  createIntervention,
  getInterventionsByStudent,
} from "../../services/intervention.service";

export default function DropoutDetailPage() {
  const { id } = useParams();

  const [student, setStudent] = useState<any>(null);
  const [interventions, setInterventions] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const [catatan, setCatatan] = useState("");

  const [verifikator, setVerifikator] = useState("Admin Kelurahan");

  const [showInterventionModal, setShowInterventionModal] = useState(false);

  const [interventionForm, setInterventionForm] = useState({
    faktor_penyebab: "",
    opd_tujuan: "",
    jenis_intervensi: "",
    catatan: "",
  });

  const loadStudent = async () => {
    try {
      setLoading(true);

      const data = await getDropoutById(Number(id));

      setStudent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadInterventions = async () => {
    try {
      const data = await getInterventionsByStudent(Number(id));

      console.log("INTERVENTIONS:", data);

      setInterventions(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!id) return;

    loadStudent();
    loadInterventions();
  }, [id]);

  useEffect(() => {
    if (student) {
      setInterventionForm((prev) => ({
        ...prev,
        faktor_penyebab: student.keterangan || "",
      }));
    }
  }, [student]);

  const hasIntervention = interventions.length > 0;

  const isVerified = !!student?.tanggal_verifikasi;

  const handleVerify = async () => {
    try {
      await verifyDropout(Number(id), {
        catatan_verifikasi: catatan,
        verifikator,
      });

      alert("ATS berhasil diverifikasi");

      setShowVerifyModal(false);

      await loadStudent();
      await loadInterventions();
    } catch (error) {
      console.error(error);

      alert("Gagal verifikasi");
    }
  };

  const handleCreateIntervention = async () => {
    try {
      await createIntervention({
        siswa_do_id: student.id,
        faktor_penyebab: interventionForm.faktor_penyebab,
        opd_tujuan: interventionForm.opd_tujuan,
        jenis_intervensi: interventionForm.jenis_intervensi,
        catatan: interventionForm.catatan,
        created_by: "Admin Kabupaten",
      });

      await loadInterventions();
      await loadStudent();
      console.log(interventionForm);
      alert("Intervensi berhasil dibuat");

      setShowInterventionModal(false);
    } catch (error) {
      console.error(error);

      alert("Gagal membuat intervensi");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">Data tidak ditemukan</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* BIODATA */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <User size={24} />

            <h2 className="text-xl font-semibold">Biodata Siswa</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem label="Nama" value={student.nama} />

            <InfoItem label="NISN" value={student.nisn} />

            <InfoItem label="NIK" value={student.nik} />

            <InfoItem label="Jenis Kelamin" value={student.jenis_kelamin} />

            <InfoItem label="Status" value={student.status} />

            <InfoItem
              label="Ingin Kembali Sekolah"
              value={student.ingin_kembali_sekolah ? "Ya" : "Tidak"}
            />
          </div>
        </div>

        {/* SEKOLAH */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <School size={24} />

            <h2 className="text-xl font-semibold">Data Pendidikan</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem label="Sekolah Asal" value={student.nama_sekolah} />

            <InfoItem
              label="Tingkat Pendidikan"
              value={student.tingkat_pendidikan}
            />
          </div>
        </div>

        {/* WILAYAH */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={24} />

            <h2 className="text-xl font-semibold">Wilayah</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem label="Kecamatan" value={student.kecamatan} />

            <InfoItem label="Desa/Kelurahan" value={student.desa_kelurahan} />
          </div>
        </div>

        {/* ALASAN ATS */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle size={24} />

            <h2 className="text-xl font-semibold">Informasi ATS</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Alasan DO</p>

              <p className="font-medium">{student.alasan_do || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Keterangan</p>

              <p>{student.keterangan || "-"}</p>
            </div>
          </div>
        </div>

        {/* PENANGANAN */}

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle size={24} />

            <h2 className="text-xl font-semibold">Penanganan ATS</h2>
          </div>

          <div className="flex gap-3">
            {!isVerified && (
              <button
                onClick={() => setShowVerifyModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-xl"
              >
                Verifikasi ATS
              </button>
            )}

            {isVerified && !hasIntervention && (
              <button
                onClick={() => setShowInterventionModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
              >
                Buat Intervensi
              </button>
            )}
          </div>

          {hasIntervention && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-6">
              <h3 className="font-semibold text-blue-800 mb-3">
                Rencana Intervensi
              </h3>

              {interventions.map((item) => (
                <div key={item.id} className="mb-4">
                  <p>
                    <strong>Faktor:</strong> {item.faktor_penyebab}
                  </p>

                  <p>
                    <strong>OPD Tujuan:</strong> {item.opd_tujuan}
                  </p>

                  <p>
                    <strong>Intervensi:</strong> {item.jenis_intervensi}
                  </p>

                  <p>
                    <strong>Catatan:</strong> {item.catatan}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* ===== MODAL VERIFIKASI ===== */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">Verifikasi ATS</h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Verifikator</label>

                <input
                  value={verifikator}
                  onChange={(e) => setVerifikator(e.target.value)}
                  className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                "
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Catatan Verifikasi</label>

                <textarea
                  rows={5}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                "
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="
                px-4 py-2
                border
                rounded-xl
              "
              >
                Batal
              </button>

              <button
                onClick={handleVerify}
                className="
                px-4 py-2
                bg-green-600
                text-white
                rounded-xl
              "
              >
                Simpan Verifikasi
              </button>
            </div>
          </div>
        </div>
      )}

      {showInterventionModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6">
            <h3 className="text-2xl font-bold mb-5">Buat Intervensi ATS</h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Faktor ATS
                </label>

                <textarea
                  rows={3}
                  value={interventionForm.faktor_penyebab}
                  readOnly
                  className="
              w-full
              border
              rounded-xl
              px-4 py-3
              bg-slate-50
            "
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  OPD Penanggung Jawab
                </label>

                <select
                  value={interventionForm.opd_tujuan}
                  onChange={(e) =>
                    setInterventionForm({
                      ...interventionForm,
                      opd_tujuan: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Pilih OPD</option>

                  {getRecommendedOPD(interventionForm.faktor_penyebab).map(
                    (opd) => (
                      <option key={opd} value={opd}>
                        {opd}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Jenis Intervensi
                </label>

                <input
                  value={interventionForm.jenis_intervensi}
                  onChange={(e) =>
                    setInterventionForm({
                      ...interventionForm,
                      jenis_intervensi: e.target.value,
                    })
                  }
                  placeholder="Contoh: Bantuan Pendidikan"
                  className="
              w-full
              border
              rounded-xl
              px-4 py-3
            "
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Catatan Intervensi
                </label>

                <textarea
                  rows={5}
                  value={interventionForm.catatan}
                  onChange={(e) =>
                    setInterventionForm({
                      ...interventionForm,
                      catatan: e.target.value,
                    })
                  }
                  className="
              w-full
              border
              rounded-xl
              px-4 py-3
            "
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowInterventionModal(false)}
                className="
            px-4 py-2
            border
            rounded-xl
          "
              >
                Batal
              </button>

              <button
                onClick={handleCreateIntervention}
                className="
            px-4 py-2
            bg-blue-600
            text-white
            rounded-xl
          "
              >
                Simpan Intervensi
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function InfoItem({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="font-medium text-slate-800">{value || "-"}</p>
    </div>
  );
}
