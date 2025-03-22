interface Column {
    header: string;
    accessor: string;
    className?: string;
}

interface TableProps {
    columns: Column[];
    renderRow: (item: any) => React.ReactNode; 
    data: any[];
}

const Table: React.FC<TableProps> = ({ columns, renderRow, data }) => {
    return (
        <table className="w-full mt-4">
            <thead>
            <tr className="text-center text-md font-semibold">
                        {columns.map((col) => (
                            <th key={col.accessor} className={`py-1 px-2  ${col.className || ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
            </thead>
            <tbody className="text-center">{data.map((item) => renderRow(item))}</tbody>
        </table>
    );
};

export default Table;
