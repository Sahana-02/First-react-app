const Contact = () => {
  return (
    <div>
      <h1 className='font-bold text-center text-3xl p-4 m-4'>
        Contact US page
      </h1>
      <form>
        <input
          type='text'
          className='border border-black p-2 m-2 rounded-md'
          placeholder='name'
        ></input>
        <input
          type='text'
          className='border border-black p-2 m-2 rounded-md'
          placeholder='message'
        ></input>
        <button className='border border-black p-2 m-2 rounded-md bg-blue-50'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Contact
