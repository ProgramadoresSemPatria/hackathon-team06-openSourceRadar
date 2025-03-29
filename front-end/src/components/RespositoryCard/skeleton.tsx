export const Skeleton = () => {
  return (
    <div className="flex flex-col justify-between w-full h-[14.5rem] border-2 rounded-xl py-6">
      <div className="space-y-4 px-4">
        <div className="w-1/2 h-4 bg-gray-200 rounded-xl animate-pulse" />
        <div className="w-full h-4 bg-gray-200 rounded-xl animate-pulse" />
        <div className="w-full h-4 bg-gray-200 rounded-xl animate-pulse" />
      </div>

      <div className="space-y-6">
        <div className="w-full h-[1px] bg-gray-200" />
        <div className="px-4">
          <div className="w-full h-4 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};
