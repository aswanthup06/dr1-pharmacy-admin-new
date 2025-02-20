import React, { useState, useEffect, useRef } from "react";
import CustomSelect from "../../../../components/EditProfile/Editps";
import { BASE_URL, PHARMACY_URL } from "../../../../config";
import axios from "axios";
import { Loader } from "../../../../components/Loader/Loader";

export default function Productlist({
  updateState: { setChangeDashboards, setDetailData },
}) {
  const [state, setState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredState, setFilteredState] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${PHARMACY_URL}/pharmacy/getproducts`).then((res) => {
      if (res?.status === 200) {
        setIsLoading(false);
        setState(res?.data?.data);
        setFilteredState(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${PHARMACY_URL}/product/getcategory`).then((res) => {
      if (res?.status === 200) {
        setIsLoading(false);
        const categoriesData = res.data.data.map((item) => item.category);
        setCategories(categoriesData);
      }
    });
  }, []);

  const handleSelectChange = (field, value) => {
    let searchValue = searchRef.current.value?.toLowerCase() || "";
    if (field === "category") {
      setSelectedCategory(value);
      const filtered = state.filter((item) => {
        const categoryMatch = value
          ? item.category.some(
              (cat) => cat.toLowerCase() === value.toLowerCase()
            )
          : true;
        const searchMatch = searchValue
          ? item.name.toLowerCase().includes(searchValue)
          : true;
        return categoryMatch && searchMatch;
      });
      setFilteredState(filtered);
    }
  };

  const handleSearchChange = (searchTerm) => {
    let filtered = state;
    if (selectedCategory) {
      filtered = filtered.filter((item) =>
        item.category.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const name = item.name ? item.name.toLowerCase() : "";
        const brand = item.brand ? item.brand.toLowerCase() : "";
        return (
          name.includes(searchTerm.toLowerCase()) ||
          brand.includes(searchTerm.toLowerCase())
        );
      });
    }
    setFilteredState(filtered);
  };

  const navigateAddP = (data) => {
    console.log(data);

    // if (isAnyFieldMissing || isAnyImageMissing) {
    //   toast.error("All fields are mandatory, fill them all");
    // } else {
    setDetailData({ data });
    setChangeDashboards({ productmanagementOrderDetail: true });
    // }
  };

  return (
    <div className="w-full h-dvh p-6 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">Product Management</h3>
      {isLoading && <Loader />}

      <div className="flex justify-between items-center mb-6">


        <div className="flex gap-4">


          <div className="relative h-10">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 pl-9  px-4 h-full  w-64 text-sm"
              onChange={(e) => handleSearchChange(e.target.value)}
            />

<i className="absolute left-3 top-1/2  transform  -translate-y-1/2 text-gray-400 ri-search-2-line"></i>



          </div>

<div className="w-64">
          <CustomSelect
            value={selectedCategory}
            onChange={(value) => handleSelectChange("category", value)}
            placeholder="Select category"
            options={categories}
          />

</div>

        </div>


        <div className="flex gap-4">
          <button
            onClick={() => setChangeDashboards({ categorymanagement: true })}
            className="bg-gray-800 text-white px-4 h-10 font-light text-sm"
          >
            Manage Category
          </button>
          <button
            onClick={() => setChangeDashboards({ addproduct: true })}
            className="flex items-center bg-blue-600 text-white px-4 h-10 font-light text-sm"
          >
            <i className="ri-add-circle-line mr-2"></i> Add New Product
          </button>
        </div>


      </div>




      <div className="grid grid-cols-5 gap-2">


      {filteredState?.map((product, index) => (
  <div
    key={index}
    onClick={() => setDetailData({ data: product })}
    className="bg-gray-100 p-4 border  cursor-pointer hover:shadow-md"
  >
    <div className="flex justify-center items-center h-32 mb-4">
      <img
        src={product?.images?.image1}
        alt={product?.name || "Product Image"}
        className="max-h-full max-w-full"
      />
    </div>

    <div className="mb-2">
      <h4 className="text-sm text-gray-600">{product?.brand}</h4>
      <h3 className="text-base font-semibold">
        {product?.name.length > 20
          ? `${product?.name.substring(0, 20)}...`
          : product?.name}
      </h3>
    </div>

    <div className="flex justify-between items-center">
      <h2 className="text-lg font-bold">₹ {product?.mrp}</h2>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent `onClick`
          navigateAddP(product);
        }}
        className="bg-blue-500 text-white px-4 py-1 text-sm font-light"
      >
        View
      </button>
    </div>
  </div>
))}

      </div>
    </div>
  );
}
