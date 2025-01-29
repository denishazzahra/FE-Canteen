import { PhotoIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from "react"

const MenuLayout = ({categoryList, handleInputMenu, handleInputFile, handleSubmitMenu, fileName, setFileName, loading, menu={}}) => {
  const [dragActive, setDragActive] = useState(false);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      handleInputFile(file); 
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      handleInputFile(file); // Pass the actual file
    }
  };
  return(
    <form onSubmit={handleSubmitMenu}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* Left Column (2/5) */}
            <div className="sm:col-span-2">
              <h1 className="text-3xl font-semibold text-gray-900">Menu</h1>
              <p className="mt-1 text-sm/6 text-gray-600">
                {menu.id ? "Ubah data menu." : "Tambah data menu."}
              </p>
            </div>

            {/* Right Column (3/5) */}
            <div className="sm:col-span-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Nama Menu
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      value={menu ? menu.name : ""}
                      onChange={handleInputMenu}
                      type="text"
                      placeholder="Contoh: Teh Manis, Nasi Goreng, dll."
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="desc"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Deskripsi Singkat
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="desc"
                      name="desc"
                      value={menu ? menu.desc : ""}
                      onChange={handleInputMenu}
                      rows={2}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6"
                    ></textarea>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="price"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Harga
                  </label>
                  <div className="mt-2">
                    <input
                      id="price"
                      name="price"
                      value={menu ? menu.price : ""}
                      onChange={handleInputMenu}
                      type="number"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="categoryId" className="block text-sm/6 font-medium text-gray-900">
                    Kategori
                  </label>
                  <div className="mt-2  grid grid-cols-1">
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={menu.categoryId || 0}
                      onChange={handleInputMenu}
                      autoComplete="category-name"
                      className="col-start-1 row-start-1 block w-full rounded-md appearance-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6"
                    >
                      <option value={0} disabled>--- Pilih ---</option>
                      {
                        categoryList.map((item)=>(
                          <option key ={item.id} value={item.id}>{item.name}</option>
                        ))
                      }
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                    Foto (opsional)
                  </label>
                  <div 
                    className={`mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 ${
                      dragActive ? "border-gray-900 bg-gray-100" : "border-gray-900/25"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                      <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
                        <label
                          htmlFor="pic"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-black focus-within:ring-2 focus-within:ring-neutral-800 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-neutral-800"
                        >
                          <span>Unggah </span>
                          <input id="pic" name="pic" onChange={handleFileChange} type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">atau <i>drag and drop</i> foto</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">PNG, JPG, JPEG maksimal 5MB</p>
                      {fileName && <p className="text-sm text-gray-500 mt-2 text-center break-all">File terunggah: {fileName}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="reset"
                  onClick={()=>setFileName("")}
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  {loading?"Loading...":"Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default MenuLayout