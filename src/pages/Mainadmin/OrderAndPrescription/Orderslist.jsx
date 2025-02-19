import React, { useEffect, useState } from "react";
import { BASE_URL, PHARMACY_URL, port } from "../../../config";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../../components/Loader/Loader";

export default function Orderslist({ updateState: { setChangeDashboards, setDetailData } }) {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [filters, setFilters] = useState({
    so_number: "",
    users: "",
    contact_no: "",
    pincode: "",
  });

  useEffect(() => {
    setDetailData(null);
  }, []);

  const fetchSalesList = async () => {
    try {
      const response = await axios.get(`${PHARMACY_URL}/pharmacy/allsalelist`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Error fetching sales data");
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["fetchSalesList"],
    queryFn: fetchSalesList,
    onError: (err) => toast.error(err?.message || "An error occurred"),
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      setdatalist(data?.data);
      setcompleted(data);
      setinitialData(data?.data);
    }
  }, [data]);

  const navigateFn = (data) => {
    setDetailData(data);
    setChangeDashboards({ prescriptionOrderDetail: true });
  };

  const SearchData = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filtering = () => {
      const filteredData = initialData.filter((data) => {
        return (
          (!filters?.so_number || data.so_number.toLowerCase().includes(filters.so_number.toLowerCase())) &&
          (!filters?.users || data.users.toLowerCase().includes(filters.users.toLowerCase())) &&
          (!filters?.contact_no || data.contact_no.includes(filters.contact_no)) &&
          (!filters.pincode || String(data.pincode || "").includes(filters.pincode))
        );
      });
      setdatalist(filteredData);
    };
    if (initialData.length > 0) filtering();
  }, [filters]);

  const filterDate = (e) => {
    const formattedDate = moment(e.target.value).format("DD-MM-YYYY");
    const filteredData = initialData.filter((item) => moment(item.created_date).format("DD-MM-YYYY") === formattedDate);
    setdatalist(filteredData);
  };

  return (
    <div className="p-6  overflow-y-auto w-full h-dvh">
      {isLoading && <Loader />}


      <div className="flex gap-6 mb-6">

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

      <h3 className="text-xl font-semibold mb-4">Sales Orders</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">No</th>
            <th className="p-3 border">Order No <input type="text" name="so_number" onChange={SearchData} className="border p-1 w-full" /></th>
            <th className="p-3 border">Customer Name <input type="text" name="users" onChange={SearchData} className="border p-1 w-full" /></th>
            <th className="p-3 border">Mobile Number <input type="number" name="contact_no" onChange={SearchData} className="border p-1 w-full" /></th>
            <th className="p-3 border">Pincode <input type="text" name="pincode" onChange={SearchData} className="border p-1 w-full" /></th>
            <th className="p-3 border">Date <input type="date" max={new Date().toISOString().split("T")[0]} onChange={filterDate} className="border p-1 w-full" /></th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {datalist.map((ele, index) => (
            <tr key={index} className="cursor-pointer hover:bg-gray-50" onClick={() => navigateFn(ele)}>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{ele?.so_number}</td>
              <td className="p-2 border">{ele?.users}</td>
              <td className="p-2 border">{ele?.contact_no}</td>
              <td className="p-2 border">{ele?.pincode}</td>
              <td className="p-2 border">{moment.utc(ele?.created_date).format("DD-MM-YYYY")}</td>
              <td className="p-2 border text-white font-light text-center" style={{ backgroundColor: ele?.so_status === "placed" ? "#6b8cfe" : ele?.so_status === "confirmed" ? "#FB8500" : ele?.so_status === "packed" ? "#ff5722" : ele?.so_status === "delivered" ? "#2A9D8F" : "gray" }}>{ele?.so_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
