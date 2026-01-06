export default function US_Hero() {
  return (
    <section className="bg-red-50 p-8 border-l-4 border-red-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-red-700 mb-2">Limited-Time US Offer 🇺🇸</h2>
      <p className="text-gray-600">
        Prices are listed in US Dollars ($). State sales tax will be calculated at checkout. Get 15% off your first order!
      </p>
      <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
        Shop US Collection
      </button>
    </section>
  );
}