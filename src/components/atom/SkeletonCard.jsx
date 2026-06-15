export default function SkeletonCard() {
  const randonNumber = Math.floor(Math.random() * 4) + 1;
  return (
    <div className="grid gap-5 p-3 md:grid-cols-2 lg:grid-cols-2 w-full h-full bg-gray-100 rounded-lg">
      {Array.from({ length: randonNumber }).map((_, index) => (
        <div
          key={index}
          className="w-full h-full bg-gray-200 rounded-lg animate-pulse p-3"
        >
          <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse mb-2 col-span-2" />
          <div className="w-full bg-gray-200 rounded-lg animate-pulse col-span-3 h-10 mt-2" />
        </div>
      ))}
    </div>
  );
}
