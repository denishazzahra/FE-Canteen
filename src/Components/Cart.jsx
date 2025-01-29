const Cart = ({onClose, cartList, total}) => {
  const numberFormat = (num) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      trailingZeroDisplay: 'stripIfInteger',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return formatter.format(num)
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-md shadow-md w-3/4 max-w-lg h-3/4 max-h-lg flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold">Keranjang Belanja</h2>
        <div className="mt-4 relative flex-1 overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-2">
                  Menu
                </th>
                <th scope="col" className="px-2 py-2 text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((item)=>(
                <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                    <p className="text-gray-800 font-light">{item.qty} @ {numberFormat(item.price)}</p>
                  </th>
                  <td className="px-2 py-2 text-right">
                    {numberFormat(item.price * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-4">
          <div className="w-full bg-black text-white font-semibold py-4 px-3 rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-semibold">Total: </h5>
              <h3 className="text-md font-semibold">{total}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart