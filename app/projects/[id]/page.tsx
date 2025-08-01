import AddProduct from "@/components/product/addProduct";
import { DataTable } from "@/components/ui/data-table";
import { mockProducts } from "@/lib/data";
import { columns } from "../../products/columns";
import PageLayout from "../../../components/layout/PageLayout";
import AddBundle from "@/components/bundle/addBundle";

export default function ProjectPage() {
  return (
    <PageLayout>
      <h2 className="text-xl font-bold">Mes fiches produits</h2>
      <DataTable columns={columns} data={mockProducts} />
      <div className="w-full flex justify-end space-x-4 mt-4">
        <AddProduct />
        <AddBundle />
      </div>
    </PageLayout>
  );
}
