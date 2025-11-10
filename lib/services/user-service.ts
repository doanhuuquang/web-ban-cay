import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "@/lib/firebase/firebase-auth";

const createUser = async ({
  email,
  password,
}: // user,
{
  email: string;
  password: string;
  // user: User;
}) => {
  await createUserWithEmailAndPassword(auth, email, password);

  // await setDoc(doc(firestore, "users", credential.user.uid), {
  //   avatarBase64: user.avatarBase64,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   email: user.email,
  //   birthOfDate: user.birthOfDate,
  //   createdAt: user.createdAt,
  //   updatedAt: user.updatedAt,
  //   isVerified: user.isVerified,
  //   isOnline: user.isOnline,
  // });
};

// const getUserById = async (userId: string): Promise<User | null> => {
//   const friendsRef = collection(firestore, "users");
//   const docSnap = await getDoc(doc(friendsRef, userId));

//   if (docSnap.exists()) {
//     return { id: docSnap.id, ...docSnap.data() } as User;
//   }

//   return null;
// };

export { createUser /*, getUserById*/ };
