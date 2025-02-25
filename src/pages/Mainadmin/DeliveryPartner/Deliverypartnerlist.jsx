import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import moment from "moment-timezone";
import { Loader } from "../../../components/Loader/Loader";
import axios from "axios";

export default function Deliverypartnerlist() {
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
console.log({datalist})
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${port}/pharmacyquotation/getdeliverypartners`
        );

        if (response?.status === 200) {
          const data = response?.data?.data || [];
          setdatalist(data);
          setinitialData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    if (!value) {
      setdatalist(initialData);
      return;
    }

    tempData = tempData.filter((item) => {
      let itemValue = item?.[name];
      if (itemValue !== undefined && itemValue !== null) {
        itemValue = itemValue.toString().toLowerCase();
        return itemValue.includes(value.toLowerCase());
      }
      return false;
    });

    setdatalist(tempData);
  };

  return (
    <div className="p-6 w-full">

      {isLoading && <Loader />}

        <div className="flex items-center border p-4 rounded-lg shadow-md w-44">
          <i className="ri-user-shared-line text-xl text-blue-500"></i>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{initialData?.length}</h2>
            <h4 className="text-sm text-gray-600">Onboarded</h4>
          </div>
        </div>





      <h3 className="text-xl font-semibold my-6">Delivery Partner List</h3>

      <div className="overflow-x-auto">

        <table className="min-w-full bg-white shadow-md text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">
                
                Name

                
                <input
                  type="text"
                  onChange={SearchData}
                  name="name"
                  placeholder="Search Name"
                  className="mt-1 p-1 border  w-full  h-10 px-4 font-light"
                />
              </th>
              <th className="py-2 px-4">
                
                Contact No

                <input
                  type="text"
                  onChange={SearchData}
                  name="phone"
                  placeholder="Search Phone"
                 
                  className="mt-1 p-1 border  w-full  h-10 px-4 font-light text-sm "
                />
              </th>
              <th className="py-2 px-4">Pharmacy Name
                <input
                  type="text"
                  name="pharmacy_name"
                  onChange={SearchData}
                  placeholder="Search Pharmacy"
                  className="mt-1 p-1 border  w-full  h-10 px-4 font-light "
                />
              </th>
              <th className="py-2 px-4">Wallet Date </th>
              <th className="py-2 px-4">Wallet Amount </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {datalist?.map((ele, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{ele?.name}</td>
                <td className="py-2 px-4">{ele?.phone}</td>
                <td className="py-2 px-4">{ele?.pharmacy_name}</td>
                <td className="py-2 px-4">{ele?.wallet_date}</td>
                <td className={`py-2 px-4 ${ele?.wallet > 0 ? 'text-red-500' : 'text-black'}`}>{ele?.wallet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
