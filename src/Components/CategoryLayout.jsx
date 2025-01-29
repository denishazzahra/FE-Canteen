const CategoryLayout = ({handleInputCategory, handleSubmitCategory, loading, category={}})=>{
  return(
    <form onSubmit={handleSubmitCategory}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* Left Column (2/5) */}
            <div className="sm:col-span-2">
              <h1 className="text-3xl font-semibold text-gray-900">Kategori</h1>
              <p className="mt-1 text-sm/6 text-gray-600">
                {category.id ? "Ubah data kategori." : "Tambah data kategori."}
              </p>
            </div>

            {/* Right Column (3/5) */}
            <div className="sm:col-span-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                <div className="col-span-full">
                  <label
                    htmlFor="categoryName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Nama Kategori
                  </label>
                  <div className="mt-2">
                    <input
                      id="categoryName"
                      name="categoryName"
                      value={category ? category.name : ""}
                      onChange={handleInputCategory}
                      type="text"
                      placeholder="Contoh: Makanan, minuman, dll."
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black-400 border-2 border-neutral-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="reset"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  Batal
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CategoryLayout