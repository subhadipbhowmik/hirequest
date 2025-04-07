import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import StatusBadge from "../components/StatusBadge";

const Profile = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, statusRes] = await Promise.all([
          api.get("/api/students/profile"),
          api.post("/api/status", {
            uid: user.uid,
            email: user.email,
            phone: user.phoneNumber,
          }),
        ]);

        const mergedData = appsRes.data.map((app) => ({
          ...app,
          status:
            statusRes.data.find((s) => s.company === app.company)?.status ||
            "Pending",
        }));

        setApplications(mergedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Applications
        </h1>

        <div className="grid gap-4">
          {applications.map((app, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{app.company}</h3>
                  <p className="text-gray-600 mt-1">{app.position}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Applied: {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
