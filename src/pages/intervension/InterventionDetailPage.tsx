import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getInterventionById,
  getInterventionLogs,
  updateInterventionStatus,
} from "../../services/intervention.service";

export default function InterventionDetailPage() {
  const { id } = useParams();

  const [intervention, setIntervention] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPage = async () => {
    try {
      setLoading(true);

      const [interventionData, logData] = await Promise.all([
        getInterventionById(Number(id)),
        getInterventionLogs(Number(id)),
      ]);

      setIntervention(interventionData);
      setLogs(logData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, [id]);

  const changeStatus = async (
    status: string,
    catatan: string,
    createdBy: string,
  ) => {
    try {
      await updateInterventionStatus(intervention.id, {
        status,
        catatan,
        created_by: createdBy,
      });

      await loadPage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitToOPD = () =>
    changeStatus("Diajukan", "Intervensi diajukan ke OPD", "Admin Kabupaten");

  const handleProcess = () =>
    changeStatus("Diproses", "Kasus sedang diproses oleh OPD", "Operator OPD");

  const handleFinish = () =>
    changeStatus(
      "Selesai",
      "Intervensi telah selesai dilaksanakan",
      "Operator OPD",
    );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  const workflowSteps = [
    "Draft",
    "Diajukan",
    "Diproses",
    "Selesai",
    "Kembali Sekolah",
  ];

  const currentStep = intervention
    ? workflowSteps.indexOf(intervention.status)
    : 0;

  const getStepLog = (step: string) => {
    return logs.find((log) => log.status === step);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border p-6">
          <h3 className="font-bold text-lg mb-4">Data ATS</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Nama" value={intervention.nama} />

            <Info label="NISN" value={intervention.nisn} />

            <Info label="Sekolah" value={intervention.nama_sekolah} />

            <Info label="Kecamatan" value={intervention.kecamatan} />
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <h3 className="font-bold text-lg mb-4">Rencana Intervensi</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Info
              label="Faktor Penyebab"
              value={intervention.faktor_penyebab}
            />

            <Info label="OPD Tujuan" value={intervention.opd_tujuan} />

            <Info
              label="Jenis Intervensi"
              value={intervention.jenis_intervensi}
            />

            <Info label="Status" value={intervention.status} />
          </div>

          <div className="mt-4">
            <label className="font-medium block mb-2">Catatan</label>

            <div className="bg-slate-50 rounded-xl p-4">
              {intervention.catatan}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <h3 className="font-bold text-lg mb-6">Timeline Penanganan</h3>

          <div className="space-y-6">
            {workflowSteps.map((step, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;

              const log = getStepLog(step);

              return (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                w-5 h-5 rounded-full
                ${
                  active
                    ? "bg-blue-600"
                    : completed
                      ? "bg-green-500"
                      : "bg-slate-300"
                }
              `}
                    />

                    {index < workflowSteps.length - 1 && (
                      <div
                        className={`
                  w-1 h-16
                  ${completed ? "bg-green-500" : "bg-slate-300"}
                `}
                      />
                    )}
                  </div>

                  <div className="pb-6">
                    <p
                      className={`
                font-semibold
                ${
                  active
                    ? "text-blue-600"
                    : completed
                      ? "text-green-600"
                      : "text-slate-500"
                }
              `}
                    >
                      {step}
                    </p>

                    {log ? (
                      <>
                        <p className="text-sm text-slate-600">
                          oleh {log.created_by}
                        </p>

                        <p className="text-xs text-slate-400">
                          {new Date(log.created_at).toLocaleString("id-ID")}
                        </p>

                        {log.catatan && (
                          <p className="text-sm text-slate-500 mt-1">
                            {log.catatan}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-slate-400">Menunggu proses</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          {intervention.status === "Draft" && (
            <button
              onClick={handleSubmitToOPD}
              className="
        px-5 py-3
        bg-blue-600
        text-white
        rounded-xl
      "
            >
              Ajukan ke OPD
            </button>
          )}

          {intervention.status === "Diajukan" && (
            <button
              onClick={handleProcess}
              className="
        px-5 py-3
        bg-amber-500
        text-white
        rounded-xl
      "
            >
              Tandai Diproses
            </button>
          )}

          {intervention.status === "Diproses" && (
            <button
              onClick={handleFinish}
              className="
        px-5 py-3
        bg-green-600
        text-white
        rounded-xl
      "
            >
              Tandai Selesai
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
