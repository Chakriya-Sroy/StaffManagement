"use client"

import { useEffect,useState ,useRef} from "react";
import ConfirmationDialog from './components/ConfirmationDialog';
import Link from "next/link";
import ReactToPrint, { useReactToPrint } from "react-to-print";

async function fetchAllStaff(){
  const res =await fetch("http://localhost:8080/staffs",{cache:'no-store'})
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}
async function deleteStaff(id:string) {
  const res = await fetch(`http://localhost:8080/delete/${id}`, {
      method: "DELETE",
      headers:{'Content-type': 'application/json',
      'Accept': 'application/json'}
  });
  if (!res.ok) {
      throw new Error('Failed to delete staff member');
  }
}
type Staff={
 StaffID:string;
 fullname:string;
 Birthday:String;
 Gender:number;
}
export default function Home() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [staffIdToDelete, setStaffIdToDelete] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  // Fetch  staffs from API
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAllStaff();
        setStaffs(data);
        setFilteredStaffs(data);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    }
    fetchData();
  }, []);
  // Filter staffs based on search query
  useEffect(() => {
    const filtered: Staff[] = staffs.filter(staff =>
      staff.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.Birthday.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.StaffID.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchQuery, staffs]);

  const handleDelete = async (id: string) => {
    setStaffIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteStaff(staffIdToDelete);
      console.log("Staff member deleted successfully");
      const updatedStaffs = await fetchAllStaff();
      setStaffs(updatedStaffs);
    } catch (error) {
      console.error("Error deleting staff:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const generatePDF= useReactToPrint({
    content: ()=>componentRef.current ||null,
    documentTitle:"Userdata",
    onAfterPrint:()=>alert("Data saved in PDF")
});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this staff member?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div className="flex justify-between">
          <input
            type="text" 
            className="block w-full flex-1 py-1 px-3 focus:outline-none bg-white shadow shadow-black/20" 
            placeholder="Start Typing..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
        <Link href={"/staff/create"}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-3">Insert</button>
        </Link>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ms-3" onClick={generatePDF}>Export</button>
     
     </div> 
    <div className="overflow-y-auto h-[500px] mt-6" ref={componentRef}>
    <table className="min-w-full divide-y divide-gray-200">
     <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Staff ID
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Fullname
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Birthday
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Gender
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Action
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {filteredStaffs.map((staff:any, index:any) => (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">{staff.StaffID}</td>
        <td className="px-6 py-4 whitespace-nowrap">{staff.fullname}</td>
        <td className="px-6 py-4 whitespace-nowrap">{staff.Birthday}</td>
        <td className="px-6 py-4 whitespace-nowrap">{staff.Gender == 1 ?"Male":"Female"}</td>
        <td className="px-6 py-4 whitespace-nowrap">
        <Link href= {`/staff/update/${staff.StaffID}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-3">
          Update
        </button>
        </Link>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(staff.StaffID)}>
          Delete
        </button>
        </td>
      </tr>
    ))}
  </tbody>
     </table>
  
    </div>
    </main>
  );
}
