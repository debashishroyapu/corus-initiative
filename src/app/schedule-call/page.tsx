import ScheduleForm from '../components/ScheduleForm';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-28 pb-24 px-6 md:px-12 flex flex-col justify-between">
      <div className="container mx-auto px-4 flex-grow">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-white leading-tight">
            Schedule a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Meeting
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Book a time that works best for you. We'll send a confirmation with all the meeting details.
          </p>
        </div>

        {/* Form Section */}
        <ScheduleForm />

        {/* Time Slot Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">📅 Available Time Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-400/10 rounded-lg hover:bg-blue-400/20 transition">
                <div className="font-medium text-white">Morning</div>
                <div className="text-gray-300">9:00 AM – 12:00 PM</div>
              </div>
              <div className="text-center p-3 bg-green-400/10 rounded-lg hover:bg-green-400/20 transition">
                <div className="font-medium text-white">Afternoon</div>
                <div className="text-gray-300">2:00 PM – 5:00 PM</div>
              </div>
              <div className="text-center p-3 bg-yellow-400/10 rounded-lg hover:bg-yellow-400/20 transition">
                <div className="font-medium text-white">Duration</div>
                <div className="text-gray-300">30–60 minutes</div>
              </div>
              <div className="text-center p-3 bg-purple-400/10 rounded-lg hover:bg-purple-400/20 transition">
                <div className="font-medium text-white">Timezone</div>
                <div className="text-gray-300">Your local time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
