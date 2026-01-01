import UserDetailAdminPage from "./UserDetailAdminPage";

export default async function UserDetailPage({params} : {
    params: Promise< {id: string}>
}) {
    const id =  (await params).id;

    return <UserDetailAdminPage id={id}/>
}

