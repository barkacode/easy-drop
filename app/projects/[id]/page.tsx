import AddProduct from "@/components/product/addProduct";
import { DataTable } from "@/components/ui/data-table";
import { mockBundles, mockProducts } from "@/lib/data";
import { columns } from "../../../components/product/columns";
import { columns as bundleColumns } from "@/components/bundle/columns";
import PageLayout from "../../../components/layout/PageLayout";
import AddBundle from "@/components/bundle/addBundle";

export default function ProjectPage() {
  return (
    <PageLayout>
      <h2 className="text-xl font-bold">Mes fiches produits</h2>
      <DataTable columns={columns} data={mockProducts} />
      <div className="w-full flex justify-end mt-4">
        <AddProduct />
      </div>
      <h2 className="text-xl font-bold mt-8">Mes bundles</h2>

      <DataTable columns={bundleColumns} data={mockBundles} />
      <div className="w-full flex justify-end mt-4">
        <AddBundle />
      </div>
    </PageLayout>
  );
}
