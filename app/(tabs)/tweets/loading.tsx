export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex flex-col gap-3">
          <div className="bg-neutral-700 h-7 w-full" />
          <div className="bg-neutral-700 h-5 w-40" />
        </div>
      ))}
    </div>
  );
}