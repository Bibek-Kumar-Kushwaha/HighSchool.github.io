import FormContainer from "@/components/FormContainer"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEM_PER_PAGE } from "@/lib/settings"
import { Class, Event, Prisma } from "@prisma/client"
import Image from "next/image"
import { auth } from "@clerk/nextjs/server";

type EventList = Event & { class: Class };

const EventListPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {

    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const currentUserId = userId;
  
    const columns = [
        {
            header: "Title",
            accessor: "title"
        },
        {
            header: "Class",
            accessor: "class",
            className: "hidden md:table-cell",
        },
        {
            header: "Date",
            accessor: "date",
            className: "hidden md:table-cell",
        },
        {
            header: "Start Time",
            accessor: "startTime",
            className: "hidden md:table-cell",
        },
        {
            header: "End Time",
            accessor: "endTime",
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

    const renderRow = (item: EventList) => {
        return (
            <tr
                key={item.id}
                className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
            >
                <td className="font-semibold text-gray-800">{item.title}</td>
                <td className="hidden md:table-cell">{item.class?.name || "-"} </td>
                <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
                <td className="hidden md:table-cell">
                    {item.startTime.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </td>
                <td className="hidden md:table-cell">
                    {item.endTime.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </td>
                <td>
                    <div className="flex gap-2 justify-center items-center py-3">
                        {/* <Link href={`/list/teachers${item.id}`}>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                                <Image
                                    src='/view.png'
                                    alt={`${item.id}_view`}
                                    height={16}
                                    width={16}
                                />
                            </button>
                        </Link> */}
                        {role === "admin" && (
                            <>
                                <FormContainer table="event" type="update" data={item} />
                                <FormContainer table="event" type="delete" id={item.id} />
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

    const query: Prisma.EventWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.title = { contains: value, mode: "insensitive" };
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // ROLE CONDITIONS

    const roleConditions = {
        teacher: { lessons: { some: { teacherId: currentUserId! } } },
        student: { students: { some: { id: currentUserId! } } },
        parent: { students: { some: { parentId: currentUserId! } } },
    };

    query.OR = [
        { classId: null },
        {
            class: roleConditions[role as keyof typeof roleConditions] || {},
        },
    ];

    const [data, count] = await prisma.$transaction([
        prisma.event.findMany({
            where: query,
            include: {
                class: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.event.count({ where: query }),
    ]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 m-4 mt-0">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                {/* Header */}
                <h1 className="text-xl font-semibold text-gray-800">All Events</h1>

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
                        {role === "admin" && <FormContainer table="event" type="create" />}
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

export default EventListPage
