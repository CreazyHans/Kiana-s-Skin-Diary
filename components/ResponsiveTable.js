// /components/ResponsiveTable.js

export default function ResponsiveTable({ children }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  );
}