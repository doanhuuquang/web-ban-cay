import { getProductBySlug } from "@/lib/services/product-service";
import storeProduct from "@/store/storeProduce";


export async function getProductBySlugMock(slug: string) {
  const { setLoading, setProductDetails } = storeProduct.getState();
  setLoading(true);
  const res = await getProductBySlug({ slug });
  setProductDetails(res.product);
  setLoading(false);
}