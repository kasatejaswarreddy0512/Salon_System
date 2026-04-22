export const uploadToCloudnary = async (file) => {
  const cloud_name = "duddovozp";
  const upload_preset = "salon_unsigned";

  if (!file) {
    console.error("No file provided");
    return null;
  }

  if (!file.type?.startsWith("image/")) {
    console.error("Selected file is not an image");
    return null;
  }

  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const fileData = await response.json();
    console.log("Cloudinary response:", fileData);

    if (!response.ok) {
      throw new Error(fileData?.error?.message || "Cloudinary upload failed");
    }

    return fileData.secure_url;
  } catch (error) {
    console.error("Upload error:", error.message);
    return null;
  }
};
