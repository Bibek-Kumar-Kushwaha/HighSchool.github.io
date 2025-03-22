import FormContainer from "@/components/FormContainer"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Class, Prisma, Teacher } from "@prisma/client"
import Image from "next/image"
import { auth } from "@clerk/nextjs/server";


type ClassList = Class & { supervisor: Teacher };

const ClassListPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {

    const { sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;

    const columns = [
        {
            header: "Class Name",
            accessor: "name",
        },
        {
            header: "Capacity",
            accessor: "capacity",
            className: "hidden md:table-cell",
        },
        {
            header: "Grade",
            accessor: "grade",
            className: "hidden md:table-cell",
        },
        {
            header: "Supervisor",
            accessor: "supervisor",
            className: "hidden md:table-cell",
        },
        ...(role === "admin"
            ? [
                {
                  header: "Actions",
                  accessor: "action",
                },
              ]
            : []),
    ];

    const renderRow = (item: ClassList) => {
        return (
            <tr
                key={item.id}
                className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
            >
                <td className="font-semibold text-gray-800">{item.name}</td>
                <td className="hidden md:table-cell">{item.capacity} </td>
                <td className="hidden md:table-cell">{item.name[0]}</td>
                <td className="hidden md:table-cell">
                    {item.supervisor.name + " " + item.supervisor.surname}
                </td>
                <td>
                    <div className="flex items-center justify-center gap-2 py-3">
                        {/* <Link href={`/list/teachers${item.id}`}>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                <Image
                                    src='/view.png'
                                    alt={`${item.name}_view`}
                                    height={16}
                                    width={16}
                                />
                            </button>
                        </Link> */}

                        {role === "admin" && (
                            <>
                                <FormContainer table="class" type="update" data={item} />
                                <FormContainer table="class" type="delete" id={item.id} />
                            </>
                        )}
                    </div>
                </td>
            </tr>
        )
    }
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION

    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "supervisorId":
                        query.supervisorId = value;
                        break;
                    case "search":
                        query.name = { contains: value, mode: "insensitive" };
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                supervisor: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.class.count({ where: query }),
    ]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 m-4 mt-0">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                {/* Header */}
                <h1 className="text-xl font-semibold text-gray-800">All Classes</h1>

                {/* Search and Filter/Sort Buttons */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search Bar */}
                    <TableSearch />

                    {/* Filter and Sort Buttons */}
                    <div className="flex items-center gap-4">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-lamaYellowDark transition duration-300">
                            <Image src="/filter.png" alt="filter" height={14} width={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow hover:bg-lamaYellowDark transition duration-300">
                            <Image src="/sort.png" alt="sort" height={14} width={14} />
                        </button>
                        {role === "admin" && <FormContainer table="class" type="create" />}
                    </div>
                </div>
            </div>

            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={data} />

            {/* Pagination */}
            <Pagination page={p} count={count} />

        </div>
    )
}

export default ClassListPage
