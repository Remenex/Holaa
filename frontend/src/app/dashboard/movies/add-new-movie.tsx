"use client";
import { useState } from "react";
import SettingsInput from "@/components/dashboard/settings-input";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  close: () => void;
  categories: { _id: string; name: string }[];
  changeRefetch: () => void;
};

export default function AddNewMovie({
  close,
  categories,
  changeRefetch,
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    selectedCategories.forEach((catId) => formData.append("categories", catId));

    console.log("FormData ready:", formData);

    fetch(`${API_URL}/movies`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("Movie created:", data))
      .then(() => setLoading(true))
      .then(() => changeRefetch())
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-12">
          <div className="rounded-sm border border-gray-600 shadow-default dashboard-main">
            <div className="border-b px-7 py-4 border-gray-600">
              <h3 className="font-medium text-white">Informacije o Filmu</h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <SettingsInput
                    label="Naslov filma"
                    icon="title"
                    placeholder="Unesi naslov filma"
                    defaultValue=""
                    name="title"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-white mb-2">Kategorije</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <label key={cat._id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={cat._id}
                          onChange={() => handleCategoryChange(cat._id)}
                        />
                        <span className="text-white">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <SettingsInput
                    label="Opis filma"
                    icon="description"
                    placeholder="Unesi kratak opis filma"
                    defaultValue=""
                    name="description"
                  />
                </div>

                <div className="mb-5 flex flex-col gap-4 sm:flex-row">
                  <SettingsInput
                    label="Trajanje filma"
                    icon="timelapse"
                    placeholder="Unesi trajanje filma"
                    defaultValue=""
                    name="duration"
                  />
                  <SettingsInput
                    label="IMDB ocena"
                    icon="star_rate"
                    placeholder="Unesite IMDB ocenu filma"
                    defaultValue=""
                    name="imdb"
                  />
                </div>

                <div className="w-full flex gap-4">
                  <div
                    id="FileUpload"
                    className="relative mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-blue-600 bg-gray-800 px-4 py-4 sm:py-7"
                  >
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke dashboard-main border-gray-600">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-blue-600">
                          Klikni za izbor naslovne slike
                        </span>{" "}
                        ili dropuj sliku ovde
                      </p>
                      <p className="mt-1.5">PNG, JPG, JPEG</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>
                  <div
                    id="FileUpload"
                    className="relative mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-green-600 bg-gray-800 px-4 py-4 sm:py-7"
                  >
                    <input
                      type="file"
                      accept="video/*"
                      name="video"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke dashboard-main border-gray-600">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#00ff00"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#00ff00"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#00ff00"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-green-600">
                          Klikni za izbor videa
                        </span>{" "}
                        ili dropuj video ovde
                      </p>
                      <p className="mt-1.5">MP4, MOV, WMV</p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex gap-4">
                  <div
                    id="FileUpload"
                    className="relative mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-yellow-500 bg-gray-800 px-4 py-4 sm:py-7"
                  >
                    <input
                      type="file"
                      name="trailer"
                      accept="video/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke dashboard-main border-gray-600">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="yellow"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="yellow"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="yellow"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-yellow-400">
                          Klikni za izbor trilera
                        </span>{" "}
                        ili dropuj video ovde
                      </p>
                      <p className="mt-1.5">MP4, MOV, WMV</p>
                    </div>
                  </div>
                  <div
                    id="FileUpload"
                    className="relative mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-red-500 bg-gray-800 px-4 py-4 sm:py-7"
                  >
                    <input
                      type="file"
                      name="mainCharacterImage"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke dashboard-main border-gray-600">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="red"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="red"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="red"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-red-500">
                          Klikni za izbor slike glavnog lika
                        </span>{" "}
                        ili dropuj sliku ovde
                      </p>
                      <p className="mt-1.5">PNG, JPG, JPEG</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium hover:shadow-1 dark:border-strokedark text-white"
                    type="button"
                    onClick={close}
                  >
                    Otkazi
                  </button>
                  <button
                    className="flex justify-center rounded bg-blue-400 px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    {loading ? "Loading" : "Dodaj Film"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
