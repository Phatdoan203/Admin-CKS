
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

import type Contract from "@/interfaces/contract";
import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/AdminComponents/SideBar";
// import { Input } from "@/components/ui/input";
import SearchSuggest from "@/components/AdminComponents/SearchSuggest";



export default function AdminPage() {
  const [data , setData] = useState<Contract[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  const fetchData = async (page : number) => {
    try {
      const response = await axios.get(`api/v1/allContract`, {
        params: {
          page: page,
          size: pageSize,
        }
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);


  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-xl font-bold text-left">Danh sách hợp đồng chờ kí</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          {/* <Input type="text" placeholder="Nhập thông tin cần tìm kiếm" />
          <Button type="submit">Tìm kiếm</Button> */}
          <SearchSuggest />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">Số hợp đồng</TableHead>
              <TableHead>Số mCAS</TableHead>
              <TableHead>CIF</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>CMND</TableHead>
              <TableHead>Kênh xác thực</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian cập nhật</TableHead>
              <TableHead className="text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.contractNumber}</TableCell>
                <TableCell>{item.mcasNumber}</TableCell>
                <TableCell>{item.cif}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.identityNumber}</TableCell>
                <TableCell>{item.authChannel}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 items-end">
                    {item.actions.map((action, index) => {
                      if (!action) return null;

                      let colorClass = '';

                      if (action === 'Đăng ký') {
                        colorClass = 'bg-green-500 hover:bg-green-700';
                      } else if (action === 'Hủy CKS') {
                        colorClass = 'bg-red-500 hover:bg-red-700';
                      } else if (action === 'Đồng bộ') {
                        colorClass = 'bg-blue-500 hover:bg-blue-700';
                      }

                      return (
                        <Button
                          key={index}
                          className={`${colorClass} text-white h-7 px-2 text-sm`}
                        >
                          {action}
                        </Button>
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>            
              ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <br />
        <div>
          <div className="flex items-center justsify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span>{' '}
                    to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * pageSize, totalItems)}
                    </span>{' '}
                    of <span className="font-medium">{totalItems}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      {/* <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="false">
                        <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                      </svg> */}
                      <SlArrowRight className="size-5 rotate-180" />
                  
                    </button>

                    {/* Hiển thị tối đa 5 trang: currentPage ± 2 */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 2
                      )
                      .map((page, i, arr) => {
                        const showEllipsis =
                          i > 0 && page - arr[i - 1] > 1;

                        return (
                          <React.Fragment key={page}>
                            {showEllipsis && (
                              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset">
                                ...
                              </span>
                            )}
                            <button
                              onClick={() => setCurrentPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset focus:z-20 ${
                                currentPage === page
                                  ? 'bg-slate-950 text-white'
                                  : 'text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      })}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      {/* <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="false">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg> */}
                      <SlArrowLeft className="size-5 rotate-180"/>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
        </div>
      </div>
    </SidebarInset>
    </SidebarProvider>
  )
}