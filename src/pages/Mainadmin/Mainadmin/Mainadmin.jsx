import React, { useEffect, useState } from "react";
import Mainadminsidebar from "../../../components/Mainadminsidebar/Mainadminsidebar";

import Prescriptions from "../OrderAndPrescription/Prescriptions";
import Orderslist from "../OrderAndPrescription/Orderslist";
import Prescriptionlist from "../OrderAndPrescription/Prescriptionlist";

import Addproduct from "../Mainadmindoctor/ProductManagement/Addproduct";
import Productdetail from "../Mainadmindoctor/ProductManagement/Productdetail";
import Productlist from "../Mainadmindoctor/ProductManagement/Productlist";
import Categorymanagement from "../Mainadmindoctor/ProductCategory/Categorymanagement";
import { CreateCampaign } from "../Campaign/CreateCampaign";

import { useLocation, useNavigate } from "react-router-dom";
import Deliverypartnerlist from "../DeliveryPartner/Deliverypartnerlist";

export default function Mainadmin() {
  const [ChangeDashboards, setChangeDashboards] = useState({
    orders: true,
  });
  const [DetailData, setDetailData] = useState();
  const SentData = (data) => {
    setChangeDashboards({ [data]: true });
  };
  const location = useLocation(); // Access location state
  const sales_id = location.state?.sales_id; // Extract sales_id from state
  const navigate = useNavigate();
  useEffect(() => {
    if (sales_id) {
      setDetailData({ sales_id: sales_id });
      setChangeDashboards({ prescriptionOrderDetail: true });
    }
  }, [sales_id]);

  console.log("ChangeDashboards>>>>", ChangeDashboards);
  return (
    <div className="flex">
      <div className="w-2/12">
        <Mainadminsidebar
          data={{ SentData: SentData, selected: ChangeDashboards }}
        />
      </div>
      <div className="w-10/12">
        {/* {ChangeDashboards?.manageadmin && (
          <>
            <Adminlist setChangeDashboards={setChangeDashboards} />
          </>
        )} */}
        {/* {ChangeDashboards?.addadmin && (
          <>
            <Addadmins />
          </>
        )} */}
        {ChangeDashboards?.orders && (
          <>
            <Orderslist updateState={{ setChangeDashboards, setDetailData }} />
          </>
        )}

        {ChangeDashboards?.prescriptions && (
          <>
            <Prescriptionlist
              updateState={{ setChangeDashboards, setDetailData }}
            />
          </>
        )}
        {ChangeDashboards?.prescriptionOrderDetail && (
          <>
            <Prescriptions
              Details={DetailData}
              setChangeDashboards={setChangeDashboards}
            />
          </>
        )}
        {ChangeDashboards?.deliverypartners && (
          <>
            <Deliverypartnerlist
              Details={DetailData}
              setChangeDashboards={setChangeDashboards}
            />
          </>
        )}
        {ChangeDashboards?.productmanagement && (
          <>
            <Productlist updateState={{ setChangeDashboards, setDetailData }} />
          </>
        )}

        {ChangeDashboards?.productmanagementOrderDetail && (
          <>
            <Productdetail
              updateState={{ setChangeDashboards, setDetailData }}
              Details={DetailData}
            />
          </>
        )}

        {ChangeDashboards?.categorymanagement && (
          <>
            <Categorymanagement updateState={{ setChangeDashboards }} />
          </>
        )}

        {ChangeDashboards?.addproduct && (
          <>
            <Addproduct
              updateState={{ setChangeDashboards, setDetailData }}
              Details={DetailData}
            />
          </>
        )}
      </div>
    </div>
  );
}
