import UploadSection from "../components/upload/UploadSection";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              DocuDash
            </h1>

            <p className="text-sm text-slate-500">
              Document Management Dashboard
            </p>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-6">

        <UploadSection />

      </main>

    </div>
  );
};

export default DashboardPage;