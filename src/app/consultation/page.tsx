import ConsultationForm from '../components/ConsultationForm';

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-28 pb-24 px-6 md:px-12 flex flex-col justify-between">
      <div className="container mx-auto px-4 flex-grow">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-white leading-tight">
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Professional Consultation</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Let's discuss your project requirements and how we can help you achieve your goals.
          </p>
        </div>

        {/* Form Section */}
        <ConsultationForm />

        {/* Highlights Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 hover:bg-white/20 transition">
            <div className="text-blue-400 text-3xl mb-3">🚀</div>
            <h3 className="font-semibold mb-2 text-white">Quick Response</h3>
            <p className="text-gray-300">We'll get back to you within 24 hours</p>
          </div>

          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 hover:bg-white/20 transition">
            <div className="text-green-400 text-3xl mb-3">💼</div>
            <h3 className="font-semibold mb-2 text-white">Expert Advice</h3>
            <p className="text-gray-300">Professional guidance from industry experts</p>
          </div>

          <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 hover:bg-white/20 transition">
            <div className="text-purple-400 text-3xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2 text-white">Confidential</h3>
            <p className="text-gray-300">Your information is safe with us</p>
          </div>
        </div>
      </div>
    </div>
  );
}
