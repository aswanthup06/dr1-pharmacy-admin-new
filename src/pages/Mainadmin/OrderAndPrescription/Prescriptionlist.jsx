import React, { useEffect, useState } from "react";
import { PHARMACY_URL, port } from "../../../config";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { Loader } from "../../../components/Loader/Loader";
import 'remixicon/fonts/remixicon.css';

export default function Prescriptionlist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    so_number: "",
    patient_name: "",
    contact_no: "",
    pincode: "",
  });
  const fetchPrescriptionList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${PHARMACY_URL}/pharmacy/prescriptionlist`
      );
      setdatalist(response?.data?.data);
      setcompleted(response?.data);
      setinitialData(response?.data?.data);
    } catch (err) {
      console.error(err);
      toast.error(err.error || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptionList();
  }, []);

  const navigateFn = (data) => {
    setDetailData(data);
    setChangeDashboards({ prescriptionOrderDetail: true });
  };

  const SearchData = (e) => {
    const { name, value } = e?.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    const filtering = () => {
      const filteredData = initialData.filter((data) => {
        const so_number_match =
          !filters?.so_number ||
          data.so_number
            .toLowerCase()
            .includes(filters?.so_number?.toLowerCase());
        const name_match =
          !filters?.patient_name ||
          data.patient_name
            .toLowerCase()
            .includes(filters?.patient_name?.toLowerCase());
        const contactMatch =
          !filters?.contact_no || data.contact_no.includes(filters?.contact_no);
        const pincode = String(data?.pincode || "");
        const pincodeMatch =
          !filters.pincode || pincode.includes(filters.pincode);

        return so_number_match && name_match && contactMatch && pincodeMatch;
      });
      setdatalist(filteredData);
    };

    filtering();
  }, [filters]);

  const reformatDate = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
  };
  const filterDate = (e) => {
    const { value } = e.target;
    const formattedDate = reformatDate(value);
    const filteredData = initialData.filter((item) => {
      const dateMatch = reformatDate(item.created_date) === formattedDate;
      return dateMatch;
    });
    setdatalist(filteredData);
  };

  return (
    <div className="w-full h-dvh p-6 overflow-y-auto">
      {isLoading && <Loader />}


      <div className="flex gap-4">

        <div className="flex items-center border p-4 rounded-lg shadow-md w-44">
          <i className="ri-user-shared-line text-xl text-blue-500"></i>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{completed?.requestlength}</h2>
            <h4 className="text-sm text-gray-600">Placed</h4>
          </div>
        </div>

        <div className="flex items-center border p-4 rounded-lg shadow-md w-44">
          <i className="ri-user-follow-line text-xl text-green-700"></i>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{completed?.otherslength}</h2>
            <h4 className="text-sm text-gray-600">Delivered</h4>
          </div>
        </div>

      </div>




      <h3 className="text-xl font-semibold my-4">Priscription Orders</h3>

     


      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">No</th>
            <th className="border border-gray-300 p-2">
            <h1>Order No</h1>

<input
    className="w-full h-10 px-4 font-light"
    type="text"
    onChange={SearchData}
    name="so_number"
    placeholder="Search"
  />

            </th>

            <th className="border border-gray-300 p-2">
              
            <h1>Name</h1>

            <input
                className="w-full h-10 px-4 font-light"
                type="text"
                onChange={SearchData}
                name="patient_name"
                placeholder="Search"
              />

            </th>
            <th className="border border-gray-300 p-2">
            <h1>Mobile Number</h1>

<input
    className="w-full h-10 px-4 font-light"
    type="text"
    onChange={SearchData}
    name="contact_no"
    placeholder="Search"
  />

            </th>
            <th className="border border-gray-300 p-2">
              
            <h1> Pincode</h1>
            <input
    className="w-full h-10 px-4 font-light"
    type="text"
    onChange={SearchData}
    name="pincode"
    placeholder="Search"
  />
            </th>
            <th className="border border-gray-300 p-2">
            <h4>Date</h4>
              <input
                className="w-full h-10 px-4 font-light"
                max={new Date().toISOString().split("T")[0]}
                type="date"
                onChange={filterDate}
                name="created_date"
              />

            </th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {datalist.map((ele, index) => (
            <tr key={index} onClick={() => navigateFn(ele)} className="cursor-pointer hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{ele?.so_number}</td>
              <td className="border border-gray-300 p-2">{ele?.patient_name}</td>
              <td className="border border-gray-300 p-2">{ele?.contact_no}</td>
              <td className="border border-gray-300 p-2">{ele?.pincode}</td>
              <td className="border border-gray-300 p-2">{moment.utc(ele?.created_date).format("DD-MM-YYYY")}</td>

              <td className="border border-gray-300 p-2 text-white text-center" style={{ backgroundColor: ele?.so_status === "placed" ? "#6b8cfe" : ele?.so_status === "confirmed" ? "#FB8500" : ele?.so_status === "packed" ? "#ff5722" : ele?.so_status === "delivered" ? "#2A9D8F" : "gray" }}>{ele?.so_status}</td>
            
            </tr>
          ))}
        </tbody>
      </table>



    </div>
  );
}
