import { Category } from "@/lib/models/category";
import {
    getCategories, createCategories, updateCategories,
    deleteCategories, getCategoriesById, getCategoriesByName
} from "@/lib/services/category-service";
import storeCategory from "@/store/storeCategory";
import { toast } from "sonner";
import { number } from "zod";

export async function getAllCategoryMock() {
    const { setLoading, setAllCategory } = storeCategory.getState();
    setLoading(true);
    const res = await getCategories();
    if (res.categories)
        setAllCategory(res.categories);
    setLoading(false);
};

export async function addCategoryMock(data: {
    categoryName: string,
    description: string,
    createAt: Date,
    updateAt: Date
}) {
    const { setLoading, addCategory } = storeCategory.getState();
    setLoading(true);
    const res = await createCategories(data);
    if (res.code == 1) {
        addCategory(res.categorie!);
        toast("Thêm sản phẩm thành công")
    }
    else
        toast("thêm sản phẩm thất bại")
    setLoading(false);
};


export async function updateCategoryMock(data: Category) {
    const { setLoading, updateCategory } = storeCategory.getState();
    setLoading(true);
    const res = await updateCategories(data);
    if (res.code == 1) {
        updateCategory(res.categorie!);
        toast("Chỉnh sửa thành công")
    }
    else
        toast("Chỉnh sửa thất bại")
    setLoading(false);
};


export async function deleteCategoryMock(id: string) {
    const { setLoading, removeCategory } = storeCategory.getState();
    setLoading(true);
    const res = await deleteCategories(id);
    if (res.code == 1) {
        removeCategory(id);
        toast("Xóa thành công")
    }
    else
        toast("Xóa thất bại")
    setLoading(false);
};


export async function getCategoryByIdOrNameMock(id: string) {

    const { setLoading, setCategory } = storeCategory.getState();
    setLoading(true);

    const n = Number(id);

    let res;

    if (typeof n === "number")
        res = await getCategoriesById(id);
    else
        res = await getCategoriesByName(id)


    if (res.code == 1) {
        setCategory(res.categories);
    }
    else
        setCategory(null)

    setLoading(false);
};