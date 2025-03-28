import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/Menu"
import Navbar from "@/components/Navbar";

const DashboardLayout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {

    return (
        <div className="h-screen w-full flex">
            {/* Left */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                <Link href='/' className="flex items-center justify-center lg:justify-start gap-2">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <span className="hidden lg:block">HighSchool</span>
                </Link>
                <Menu />
            </div>

            {/* Rignt */}
            <div className="w-[86%] md:w-[96%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;