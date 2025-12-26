import storeAccount from "@/store/storeAccount";
import { addAccountSer, getAllUserProfile, getUserProfileById, updateUserStateLock, updateUserStateUnlock } from "@/lib/services/user-service";
import { toast } from "sonner";

export async function getAllAccountMock() {

    const { setLoading, setAllAccount } = storeAccount.getState();
    setLoading(true);
    const res = await getAllUserProfile();
    if (res.code === 1) {
        setAllAccount(res.account);
    }

    setLoading(false);
}

export async function getUserByIdAccountMock(id: string) {

    const { setLoading, setAccount } = storeAccount.getState();
    setLoading(true);
    const res = await getUserProfileById(id);
    if (res.code === 1) {
        setAccount(res.account);
    }

    setLoading(false);
}


export async function updateStatusLockAccountMock(id: string, status: boolean, lockedReason: string) {

    const { setLoading, updateStateLockAccount } = storeAccount.getState();
    setLoading(true);
    let res;

    if (status)
        res = await updateUserStateLock(id, lockedReason)
    else
        res = await updateUserStateUnlock(id)

    if (res.code === 1) {
        updateStateLockAccount(id, status);
        toast("cập trạng thái tài khoản thành công")
    }
    else
        toast("cập nhật trạng thái tài khoản thất bại")

    setLoading(false);
}

export async function addAccountMock({ email, password
}: {
    email: string;
    password: string;
}) {

    const { setLoading, addAccount } = storeAccount.getState();
    setLoading(true);

    const res = await addAccountSer({ email, password })

    if (res.code === 1 && res.account) {
        addAccount(res.account);
        toast("Thêm tài khoản thành công")
    }
    else
        toast("Thêm khoản thất bại")

    setLoading(false);
}