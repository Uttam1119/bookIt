import { useEffect, useState } from "react";
import { api } from "../api";
import { Experience } from "../types";
import ExperienceCard from "../components/ExperienceCard";
import Header from "../components/Header";
import Loader from "../components/Loader";

export default function Home() {
  const [exps, setExps] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function fetchExperiences() {
    try {
      setLoading(true);
      const res = await api.get("/experiences");
      setExps(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (query: string) => {
    if (!query) return setFiltered(exps);
    const q = query.toLowerCase();
    setFiltered(
      exps.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.location && e.location.toLowerCase().includes(q))
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />

      <main className="w-full px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="mx-24 grid gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((e) => (
              <ExperienceCard key={e._id || e.id} e={e} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
