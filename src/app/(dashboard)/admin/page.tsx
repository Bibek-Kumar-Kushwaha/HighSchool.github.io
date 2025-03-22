import Announcements from "@/components/Announcements"
import AttendanceChartContainer from "@/components/AttendenceChartContainer"
import CountChartContainer from "@/components/CountChartContainer"
import EventCalendarContainer from "@/components/EventCalendarContainer"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"

const Admin = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* Left */}
      <div className=" lg:w-2/3 flex flex-col gap-8">
        {/* user Card */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type='admin' />
          <UserCard type='teacher' />
          <UserCard type='student' />
          <UserCard type='parent' />
        </div>

        {/*  middle chart*/}
        <div className="flex gap-4 flex-col lg:flex-row">

          {/* count chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer/>
          </div>

          {/* Attendence chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer/>
          </div>
        </div>

        {/* bottom chart */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>

      </div>

      {/* Right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <EventCalendarContainer  searchParams={searchParams}/>
          <Announcements/>
      </div>
    </div>
  )
}

export default Admin
