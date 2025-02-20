import React from "react";

export default function Mainadminsidebar({ data: { SentData, selected } }) {
  console.log("selected>>>>", selected);
  const FindButtonValue = (data) => {
    SentData(data);
  };
  return (
    <div className="p-4 bg-gray-200 h-screen flex flex-col justify-between">

<div>
<img className="h-8 mb-5" src="drfull.png" alt=""/>
      {[
        { key: "orders", label: "Orders" },
        { key: "prescriptions", label: "Prescriptions" },
        { key: "deliverypartners", label: "Delivery Partners" },
        { key: "productmanagement", label: "Product Management" },
      ].map((item) => (
        <div
          key={item.key}
          onClick={() => FindButtonValue(item.key)}
          className={`flex items-center p-3  cursor-pointer transition-all duration-200  ${
            selected?.[item.key] ? "bg-blue-500 text-white " : "bg-white hover:bg-gray-200"
          }`}
        >
          <h4 className="text-sm font-normal">{item.label}</h4>
        </div>
      ))}

</div>



      <div>
      
        <button className="bg-white w-full p-3 text-red-500">Logout<i class="ri-login-box-line ml-2"></i></button>
       
 

     
      </div>



    </div>
  );
}


