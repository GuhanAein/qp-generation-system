import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Input Component
const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Table Components
const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, className = "" }) => (
  <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>
);

const TableBody = ({ children, className = "" }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>
);

const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);

const TableHead = ({ children, className = "" }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-50 ${className}`}>
    {children}
  </tr>
);

// Main Reviewer Component
const Reviewer = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const reviewData = [
    { sno: '0001', questionRank: 'q1', staffName: 'antibioc', role: 'faculty', department: 'q1', status: 'Pending' },
    { sno: '0002', questionRank: 'ds', staffName: 'AAI&CC', role: 'COE', department: 'ds', status: 'Approved' },
    { sno: '0001', questionRank: 'bits@try.ac.in', staffName: 'AAI&CC', role: 'COE', department: 'CT', status: 'Approved' },
    { sno: '0001', questionRank: 'bits@try.ac.in', staffName: 'AAI&CC', role: 'COE', department: 'CT', status: 'Approved' },
    { sno: '0001', questionRank: 'bits@try.ac.in', staffName: 'AAI&CC', role: 'COE', department: 'CT', status: 'Approved' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">REVIEWER</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Faculty Information</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Question Paper</label>
            <Input placeholder="Question Paper" />
          </div>
          <div>
            <label className="text-sm font-medium">Subject</label>
            <Input placeholder="Subject Name" />
          </div>
          <div>
            <label className="text-sm font-medium">Created by</label>
            <Input placeholder="Staff Name" />
          </div>
          <div>
            <label className="text-sm font-medium">Department</label>
            <Input placeholder="Department" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead>S.NO</TableHead>
              <TableHead>Question Rank</TableHead>
              <TableHead>Staff Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>{item.sno}</TableCell>
                <TableCell>{item.questionRank}</TableCell>
                <TableCell>{item.staffName}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-sm ${item.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Reviewer;