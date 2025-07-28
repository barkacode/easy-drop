interface StoreCardProps {
  title: string;
  status: string;
}

export default function StoreCard({ title, status }: StoreCardProps) {
  return (
    <div className={` border p-4 rounded-md shadow-md h-32 w-48 `}>
      <h3 className="text-lg font-semibold ">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{status}</p>
    </div>
  );
}
