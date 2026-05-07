const DocumentList = ({ documents }) => {

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-semibold">
            Uploaded Documents
          </h2>

          <p className="text-slate-500 text-sm">
            Manage uploaded PDF files
          </p>
        </div>

        <div className="text-sm text-slate-500">
          {documents.length} files
        </div>

      </div>

      {documents.length === 0 ? (

        <div className="text-center py-10 text-slate-500">
          No documents uploaded yet
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-left">

                <th className="pb-3 font-medium text-slate-600">
                  File Name
                </th>

                <th className="pb-3 font-medium text-slate-600">
                  Size
                </th>

                <th className="pb-3 font-medium text-slate-600">
                  Uploaded
                </th>

                <th className="pb-3 font-medium text-slate-600">
                  Status
                </th>

                <th className="pb-3 font-medium text-slate-600">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {documents.map((doc) => (

                <tr
                  key={doc._id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  <td className="py-4">

                    <div>
                      <p className="font-medium text-slate-700">
                        {doc.originalName}
                      </p>

                      <p className="text-sm text-slate-500">
                        PDF Document
                      </p>
                    </div>

                  </td>

                  <td className="py-4 text-slate-600">

                    {(doc.size / 1024).toFixed(2)} KB

                  </td>

                  <td className="py-4 text-slate-600">

                    {new Date(doc.createdAt).toLocaleString()}

                  </td>

                  <td className="py-4">

                    <span
                      className="
                        px-3 py-1 rounded-full text-sm
                        bg-green-100 text-green-700
                      "
                    >
                      {doc.status}
                    </span>

                  </td>

                  <td className="py-4">

                    <a
                      href={`http://localhost:5000${doc.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        bg-blue-600 text-white
                        px-4 py-2 rounded-lg
                        hover:bg-blue-700
                        transition
                        text-sm
                      "
                    >
                      Download
                    </a>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default DocumentList;