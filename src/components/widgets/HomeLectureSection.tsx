import { ENUM_SORT_ORDER, ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { useGetAllVideoQuery } from "@/redux/api/adminApi/homeVideoApi";
import { Error_model_hook } from "@/utils/modalHook";
import { useEffect, useState } from "react";
import HomeVideoCard from "../shared/HomeVideoCard";

const ITEMS_PER_PAGE = 4;
const GRADES = Array.from({ length: 10 }, (_, i) => `grade ${i + 1}`);

const HomeLectureSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const query: Record<string, any> = {
    status: ENUM_STATUS.ACTIVE,
    limit: 99999, // Set a high limit to get all items
    sortOrder: ENUM_SORT_ORDER.ASC,
    sortBy: "serial_number",
    isDelete: ENUM_YN.NO,
  };

  const { data, isLoading, error }: any = useGetAllVideoQuery(query);

  useEffect(() => {
    if (error || (data && data.data?.success === false)) {
      const errorType: any = error;
      Error_model_hook(errorType?.message || data?.data?.message);
    }
  }, [error, data]);

  // Filter videos based on the selected grade and search query
  const filteredItems = data?.data?.filter((item: any) => {
    const matchesGrade = selectedGrade ? item.grade === selectedGrade : true;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems?.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Generate page numbers for pagination
  const totalPages = Math.ceil((filteredItems?.length || 0) / ITEMS_PER_PAGE);

  return (
    <div>
      <div className="container mx-auto py-5 px-9 lg:py-10 lg:px-24 mt-3 bg-[#e2dede]">
        {/* Grade Tabs */}
        {/* <div className="flex justify-center mb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {GRADES.map((grade, index) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`flex-shrink-0 mx-1 px-3 py-1 border rounded ${
                  selectedGrade === grade
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                Grade {index + 1}
              </button>
            ))}
            <button
              onClick={() => setSelectedGrade(null)} // Reset filter
              className={`flex-shrink-0 mx-1 px-3 py-1 border rounded ${
                selectedGrade === null
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              All
            </button>
          </div>
        </div> */}

        {/* Search Filter */}
        <div className="mb-4 flex flex-wrap justify-between gap-2 sm:p-0 lg:p-2 items-center  w-full">
          <h3 className="text-lg lg:text-4xl 2xl:text-[50px] ">
            Check Your Math Skill By Grade Level
          </h3>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-2 2xl:px-5 2xl:py-5 border bg-primary text-white placeholder:text-white rounded-[35px] placeholder:lg:text-2xl placeholder:text-xl placeholder:p-2 "
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:p-0 p-2">
          {currentItems?.map((item: any, index: any) => (
            <HomeVideoCard
              key={index}
              title={item?.title}
              desc={item?.description}
              videoname={item?.videoFileName}
              videoURl={item?.videoURL}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 w-full">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLectureSection;
