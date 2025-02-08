import React from 'react';
import {
    Table as ShadTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import LazyLoadImg from './LazyLoadImg';
import TableSkeleton from './Skeletons/TableSkeleton';

interface Column {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
    columns: Column[];
    data: any[];
    className?: string;
    onRowClick?: (row: any) => void;
    loading?: boolean;
}

const Table: React.FC<TableProps> = ({ columns, data, className, onRowClick, loading }) => {

    if (loading) {
        return <TableSkeleton />;

    }

    if (data?.length === 0 && !loading) {
        return (
            <div className='w-full flex flex-col items-center justify-center h-full'>
                <LazyLoadImg src='/images/no-data-found.svg' className='h-[500px] w-[500px]' />
                <h1 className="text-3xl font-semibold uppercase">No data found!</h1>
            </div>
        )
    }

    return (
        <>
            <ShadTable className={`border-2 ${className || ''}`}>
                <TableHeader>
                    <TableRow className="uppercase">
                        {columns.map((column) => (
                            <TableHead key={column.accessor} className="p-2 border-b">{column.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            className="cursor-pointer"
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((column) => (
                                <TableCell key={`${rowIndex}-${column.accessor}`} className="p-2 border-b py-5">
                                    {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </ShadTable>
        </>
    );
};

export default Table;
