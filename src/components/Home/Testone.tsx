import React, { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Authentication/AuthProvider/AuthProvider";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure/UseAxiosSecure";
import UseAxiosPublic from "../../../Hooks/useAxiosPublic/UseAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet-async";
import { Controller } from "react-hook-form";
const image_hosting_key = "9911f27aca3347c387f577a495373922";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddProduct = () => {
  const { loading, currentUser } = useContext(AuthContext);
  const [handleProduct, setHandleProduct] = useState(null);
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const [addImg, setAddImg] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const email = currentUser?.email;
  const name = currentUser?.displayName;
  const photo = currentUser?.photoURL;
  const authorData = {
    authorMail: email,
    authorName: name,
    authorPhoto: photo,
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  // remove files
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  // get files and uploaded to the imgBB
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price.value;
    const category = form.category.value;
    const tag = form.tag.value;
    const longDescription = form.longDescription.value;

    const data = {
      title,
      description,
      price,
      category,
      tag,
      longDescription,
      authorData, // from your authorData state
    };
    console.log(data);

    let imgUrls = []; // To store the image URLs

    // Map through each file and upload to imgBB
    const promises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res?.data?.success) {
          // Push the image URL to the imgUrls array
          imgUrls.push(res?.data?.data?.display_url);
          setAddImg(true);
          setLoadingBtn(false);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });

    // Wait for all image uploads to complete
    await Promise.all(promises);

    // Combine the data and image URLs
    const product = {
      ...data,
      images: imgUrls, // Add image URLs here
    };

    // Set the blog info to state
    setHandleProduct(product);

    // Feedback to the user
    toast.success("Product added, please check and post!");
  };

  const handlePost = async () => {
    try {
      const res = await axiosSecure.post("/product", handleProduct);
      if (res?.data) {
        toast.success("Product successfully created");
        setHandleProduct(null);
        navigate("/dashboard/all-product");
      } else {
        toast.error("Failed to create the product");
      }
    } catch (error) {
      toast.error("Error creating product");
      console.log("Error:", error.message);
    }
  };

  // loading spinner
  if (loading) {
    <p>loading..</p>;
  }
  return (
    <div className="font-primary lg:w-[1500px] md:w-[650px] w-[320px] mx-auto">
      <Helmet>
        <title>AutoLux | Add Product</title>
      </Helmet>
      <section>
        <h1 className="md:text-4xl text-2xl font-semibold">Add Products</h1>
        <p className="text-gray-600 text-sm md:text-xl">
          Add a product and type product specification
        </p>
      </section>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-xl mt-5 py-5"
      >
        <div className="px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-3">
            {/* file add */}
            {files.map((file) => (
              <span key={file.preview}>
                <img
                  src={file.preview}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="w-72 h-44 rounded-lg border border-gray-300 shadow-lg "
                ></img>
                {/* button */}
                <button
                  type="button"
                  className="mt-3 text-[12px]  uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  remove
                </button>
              </span>
            ))}
          </div>
          {/* drag and drop */}
          <div
            {...getRootProps()}
            className="flex items-center justify-center my-10 w-full"
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className={`${
                    isDragActive
                      ? "w-14 h-8 mb-4 text-gray-500 dark:text-gray-400 animate-bounce"
                      : "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {isDragActive && <p className="text-2xl">Drop the image</p>}

                  <span
                    className={`${!isDragActive ? "font-semibold" : "hidden"}`}
                  >
                    Click to upload or drag and drop
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                {...getInputProps()}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>
          {/* input field */}
          <div className="grid grid-cols-6 gap-x-5 mb-5 gap-y-3">
            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Product title
              </label>

              <input
                type="text"
                placeholder="product title"
                name="title"
                className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Description
              </label>

              <input
                type="text"
                name="description"
                placeholder="product description"
                className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Price
              </label>

              <input
                type="text"
                name="price"
                placeholder="product price"
                className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="category"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="category"
                className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="category"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Tags
              </label>

              <input
                type="text"
                name="tag"
                placeholder="tags"
                className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="long-description"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Long Description
              </label>

              <input
                type="text"
                name="longDescription"
                placeholder="long-description"
                className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
          </div>
          {/* submit data */}
          <div className="flex justify-center space-x-6">
            {!loadingBtn && addImg ? (
              <button
                onClick={handlePost}
                className="bg-green-600 px-6 text-white rounded-lg py-1 btn w-full"
              >
                Post
              </button>
            ) : (
              <button
                type="submit"
                className={`bg-blue-600 px-6 text-white rounded-lg py-1 w-full btn`}
                disabled={loadingBtn} // Disable button while loading
              >
                {loadingBtn ? (
                  <span className="loading loading-ring loading-sm bg-blue-950"></span> // Display spinner when loading
                ) : (
                  "Add Blog info" // Display text when not loading
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;