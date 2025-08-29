import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationData {
  total: number;
  totalPages: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface PaginationWrapperProps {
  data: PaginationData | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  showInfo?: boolean;
  infoText?: string;
}

export function PaginationWrapper({
  data,
  currentPage,
  onPageChange,
  loading = false,
  showInfo = true,
  infoText,
}: PaginationWrapperProps) {
  if (!data || data.totalPages <= 1) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = data.totalPages;
    const current = currentPage;

    pages.push(1);

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    if (start > 2) {
      pages.push("ellipsis-start");
    }

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const defaultInfoText = `Mostrando ${
    (currentPage - 1) * data.limit + 1
  } a ${Math.min(currentPage * data.limit, data.total)} de ${
    data.total
  } resultados`;

  return (
    <div className="flex items-center justify-between px-2">
      {showInfo && (
        <div className="text-sm text-muted-foreground">
          {infoText || defaultInfoText}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (data.hasPrevious && !loading) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={
                !data.hasPrevious || loading
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis-start" || page === "ellipsis-end" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading) {
                      onPageChange(page as number);
                    }
                  }}
                  isActive={page === currentPage}
                  className={loading ? "pointer-events-none" : ""}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (data.hasNext && !loading) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={
                !data.hasNext || loading ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
