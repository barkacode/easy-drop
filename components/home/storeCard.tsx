interface StoreCardProps {
  title: string;
}

export default function StoreCard({ title }: StoreCardProps) {
  return (
    <div className={` border p-4 rounded-md shadow-md h-32 w-48 `}>
      <h3 className="text-lg font-semibold ">{title}</h3>
    </div>
  );
}
