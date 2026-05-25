'use client'

import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  searchPlaceholder?: string
  searchKeys?: string[]
  pageSize?: number
  onRowClick?: (row: any) => void
  actions?: (row: any) => React.ReactNode
}

export default function DataTable({
  columns,
  data,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  pageSize = 10,
  onRowClick,
  actions,
}: DataTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const filteredData = data.filter((row) => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return searchKeys.some((key) => {
      const value = row[key]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchLower)
      }
      return false
    })
  })

  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice(
    page * pageSize,
    (page + 1) * pageSize
  )

  return (
    <div>
      {/* Search */}
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            className="w-full rounded-lg border border-[#2A3545] bg-[#0F1729] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-[#3B82F6] focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#2A3545]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A3545] bg-[#0F1729]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A3545]">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  onClick={() => onRowClick?.(row)}
                  className={`bg-[#1A2332] transition-colors hover:bg-[#1A2332]/80 ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="whitespace-nowrap px-4 py-3 text-sm text-gray-300"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key] ?? '-'}
                    </td>
                  ))}
                  {actions && (
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {page * pageSize + 1} to{' '}
            {Math.min((page + 1) * pageSize, filteredData.length)} of{' '}
            {filteredData.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg border border-[#2A3545] p-2 text-gray-400 transition-colors hover:bg-[#1A2332] disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-400">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-lg border border-[#2A3545] p-2 text-gray-400 transition-colors hover:bg-[#1A2332] disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
