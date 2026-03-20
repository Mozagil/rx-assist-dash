import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchPlaceholder?: string;
  rowClassName?: (row: any) => string | undefined;
}

export default function DataTable({ columns, data, searchPlaceholder = "Ara...", rowClassName }: DataTableProps) {
  return (
    <div className="medical-card p-0 overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder={searchPlaceholder} className="search-input pl-9" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="medical-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                  Kayıt bulunamadı
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className={cn(rowClassName?.(row))}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
