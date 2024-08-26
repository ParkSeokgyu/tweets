import ListProduct from "@/components/list-product";
import db from "@/lib/db";

// 비동기 함수로 제품 목록 가져오기
async function getProducts() {

  await new Promise((resolve) => setTimeout(resolve, 3000)); // 강제로딩

  const products = await db.product.findMany({
    select: {
      title: true,
      created_at: true,
      photo: true,
      id: true,
    },
  });
  return products;
}


// Products 컴포넌트
export default async function Products() {
  const products = await getProducts();
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
    </div>
  );
}