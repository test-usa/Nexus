import { useEffect, useState } from "react";
import { Mail, User, Loader2 } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
// import axios from "axios";
// const image_hosting_key = "5524bfe220f89f241e43b7ad5af70f4f";
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
}

const UserProfile = () => {
  // const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [ModalOpen, setOpenModal] = useState<boolean>(false);
  const { data, isLoading } = useFetch("user/get-self");

  useEffect(() => {
    if (data?.success) {
      setUser(data.data);
      setLoading(false);
    }
  }, [data]);
  // console.log(user);
  const defaultAvatar =
    "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

  // const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const formData = new FormData(e.currentTarget);
  //   const name = formData.get("name") as string;
  //   const imageFile = formData.get("file") as File;

  //   if (!imageFile) {
  //     toast.error("Please select an image file");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // Prepare form data for ImgBB
  //     const imgbbFormData = new FormData();
  //     imgbbFormData.append("image", imageFile);

  //     // Upload to ImgBB
  //     const uploadRes = await axios.post(image_hosting_api, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (uploadRes.data.success) {
  //       const imageUrl = uploadRes.data.data.url;

  //       // Now update user profile with the new image
  //       const updateRes = await axiosPublic.patch("user/update-self", {
  //         name,
  //         photo: imageUrl,
  //       });

  //       if (updateRes.data.success) {
  //         setUser(updateRes.data.data);
  //         toast.success("Profile updated successfully!");
  //         setOpenModal(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     toast.error("Failed to update profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className=" flex items-center justify-center mx-auto min-w-[320px] max-w-[800px] h-full w-full px-4">
      <div className="bg-[var(--color-dashboardbg)] overflow-hidden w-full ">
        {/* Header */}
        <div className=" px-8 py-12">
          <h2 className="text-3xl font-bold text-[var(--color-textcolor)] text-center">
            User Profile
          </h2>
        </div>

        {loading || isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-[var(--color-textcolor)] animate-spin" />
          </div>
        ) : (
          <div className="p-8">
            {/* Profile Photo Section */}
            <div className="flex justify-center -mt-20 mb-8 pt-2">
              <div title="update" className="relative cursor-pointer">
                <img
                  src={user?.photo || defaultAvatar}
                  alt={user?.name || "User Avatar"}
                  className="w-24 h-24 rounded-[8px] object-cover border-4 bg-clip-border bg-gradient-to-r from-gray-700 to-slate-600 via-green-700 shadow-lg"
                />
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-6">
              {/* Name */}
              <div className="bg-gray-800  rounded-[8px] p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <User className="text-xl text-[var(--color-textcolor)] " />
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Full Name
                    </p>
                    <p className="text-lg font-medium  text-[var(--color-textcolor)] ">
                      {user?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-gray-800 rounded-lg p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="text-xl text-[var(--color-textcolor)] " />
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Email Address
                    </p>
                    <p className="text-lg font-medium text-[var(--color-textcolor)] ">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  onClick={() =>
                    toast.success("Edit functionality coming soon!")
                  }
                ></button>
              </div>

              {/* <Button
                onClick={() => setOpenModal(!ModalOpen)}
                size="lg"
                className="py-3 px-6 rounded-[8px] bg-[var(--color-dashboardsecondary)] text-gray-200 cursor-pointer transform translate duration-300 hover:bg-[var(--color-dashboardsecondary)] hover:text-white"
              >
                Edit Profile
              </Button> */}

              {/**** SHOW FORM MODAL FOR USER DATA UPDATE ****/}
              {/* {ModalOpen && (
                <Dialog open={ModalOpen} onOpenChange={setOpenModal}>
                  <DialogContent className="max-w-[450px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={SubmitHandler} className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" name="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="eamil" className="text-right">
                          Email
                        </Label>
                        <Input
                          defaultValue={user?.email}
                          disabled
                          id="email"
                          name="email"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                          Image
                        </Label>
                        <Input
                          type="file"
                          id="file"
                          name="file"
                          className="col-span-3"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="py-3 px-6 rounded-[8px] bg-[var(--color-dashboardbg)] hover:bg-[var(--color-dashboardbg)] text-gray-200 cursor-pointer transform translate duration-300 hover:text-gray-900"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
