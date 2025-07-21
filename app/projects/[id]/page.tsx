import AddProduct from "@/components/Product/addProduct";
import { DataTable } from "@/components/ui/data-table";
import { mockProducts } from "@/lib/data";
import { columns } from "../../products/columns";
import PageLayout from "../../../components/Layout/PageLayout";

export default function ProjectPage() {
  return (
    <PageLayout>
      <h2 className="text-xl font-bold">Mes fiches produits</h2>
      <DataTable columns={columns} data={mockProducts} />
      <div className="w-full flex justify-end ">
        <AddProduct />
      </div>
    </PageLayout>
  );
}
