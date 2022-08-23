import React, { RefObject, useEffect, useRef, useState } from 'react'
//Redux
import { getPosts } from '../../store/Slices/postSlice.js'
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks'
import { dislike, likedposts } from '../../store/Slices/userSlice'
// Components
import Layout from '../Layout/layout';
import Modal from '../modal';
import { title } from 'process';
import ReactPaginate from 'react-paginate';

type PostData = {
  id: number,
  body: string
  title: string,
  userId: number,
}

type SinglePost = {
  title: string;
  body: string
}

function Posts() {

  const dispatch = useAppDispatch();
  const { login } = useAppSelector(state => state.user);

  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<PostData[]>();
  const [openModal, setOpenModal] = useState<boolean>();
  const searchRef = useRef<HTMLInputElement | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchparam, setSearchParam] = useState<string>('');
  const [postId, setPostId] = useState({ loading: false, id: 0 });
  const [singlePost, setSinglePost] = useState({ title: '', body: '' });

  // --- Pagination
  const postperpage = 10;
  const allData = 100
  const pagestoshow = Math.ceil(allData / postperpage);
  // -------

  // ------- GET POSTS WITH PAGINATION PARAMETER
  useEffect(() => {
    const getPost = async (page: number) => {
      setLoading(true);
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=${postperpage}`)
        .then(res => res.json())
        .then(data => { setLoading(false); setPosts(data) })
    }
    getPost(page)
  }, [page])

  // -------- GET SINGLE POST FOR EDIT IN MODAL
  useEffect(() => {
    const getpostById = async () => {
      const getPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId.id}`)
        .then(res => res.json())
        .then(data => { setSinglePost({ title: data.title, body: data.body }); console.log(singlePost) })
    }
    Number(postId.id) > 0 && getpostById()
  }, [postId])

  // -------- PAGINATION FUNCTIONALITY
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 10) % 100;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setPage(newOffset)
  };

  // ------- POST REQUEST FOR EDITED SINGLE POST
  function editPost(e: any) {
    e.preventDefault();
    setPostId({ ...postId, loading: true })
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId.id}`, {
      method: 'POST',
      body: JSON.stringify({
        title: singlePost.title,
        body: singlePost.body,
        userId: postId.id
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        setPostId({ ...postId, loading: false }); setOpenModal(false)
      })
  }

  // --------- FILTER THROUGH THE INCOMMING DATA FROM USER
  function searchData(e: any) {
    e.preventDefault();
    setSearchParam(searchRef?.current?.value)
  }


  return (
    <>
      {loading &&
        <div className='animate-pulse flex items-center text-3xl rounded-md py-5 bg-primary-700 text-secondary'>
          <svg className="animate-spin bg-primary-500 text-secondary h-6 w-6 mr-3" viewBox="0 0 24 24">
          </svg>
          Loading...
        </div>}
      {!loading &&
        <div className='flex flex-col md:flex-row justify-between'>
          <form onSubmit={(e) => searchData(e)} className=''>
            <div className='input-control items-center ml-3 flex md:w-[30vw]
        rounded-md border border-secondary-100 focus-within:border-secondary-300' >
              <span className='text-xl pl-3 pr-1'>&#x1F50D;</span>
              <input type="search" ref={searchRef}
                className='py-3 px-5 w-full block focus:outline-hidden border-0' />
              <button className='btn btn-secondary p-2 text-sm [margin-inline-end:10px]'>Search</button>
            </div>
          </form>
          <>
            {searchparam && <p className='text-gray-700 mt-5 ml-2'>You have searched for :
              <span className='pl-2 text-blue-900 font-bold'>{searchparam}</span> |
              <button className='mx-2 text-red-900'
                onClick={() => { setSearchParam(''); searchRef.current.value = '' }}>
                clear Filter</button></p>}
          </>
        </div>
      }

      <div className='grid mx-4 md:mx-0 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-4 my-5'>
        {posts && !loading &&
          posts
            .filter(item => {
              if (searchparam)
                return item.title.includes(`${searchparam}`)
              else { return item }
            })
            .map((item: PostData) =>
              <div key={item?.id} id={`${item?.id}`} title={item.id.toString()}
                className='border border-gray-300 rounded-lg shadow-sm p-5 hover:shadow-lg'>
                <div className="inline-flex w-full items-baseline justify-between">
                  <h5 title={`${item.title}`}
                    className='mb-3 m-inline-end-10 [max-width:15em] whitespace-nowrap text-ellipsis overflow-hidden pr-4'>
                    {item?.title}
                  </h5>
                  {login === 'true' &&
                    <span className='text-lg text-black p-2 cursor-pointer'
                      onClick={() => { setOpenModal(true); setPostId({ ...postId, id: item.id }) }}>
                      &#x270E;</span>}
                </div>
                <p className='text-sm'>{item?.body}</p>
              </div>
            )}
        {openModal && <Modal title='Edit this Post' close={() => setOpenModal(false)}>
          <form className='py-4' onSubmit={(e) => editPost(e)}>
            <div>
              <label htmlFor="title" className='block'>Title</label>
              <input type="text" id='title'
                onChange={(e) => setSinglePost({ ...singlePost, title: e.target.value })}
                value={singlePost.title}
                className='border border-gray-200 focus:border-gray-300 w-full p-3 rounded-md mt-2' />
            </div>
            <div className='mt-4'>
              <label htmlFor="body" className='block'>Title</label>
              <textarea name="body"
                value={singlePost.body}
                onChange={(e) => setSinglePost({ ...singlePost, body: e.target.value })}
                className='w-full border b-gray-200 outline-0 rounded-md focus:border-gray-300 p-4'
                cols={10} rows={5}></textarea>
            </div>
            <div className='text-center'>
              <button className='btn btn-secondary border-0 py-2 hover:bg-transparent hover:text-slate-800 rounded-none' onClick={() => setOpenModal(false)}>Close</button>
              <button className='btn btn-primary  py-2'>{postId.loading ? 'Updating...' : 'submit'}</button>
            </div>
          </form>
        </Modal>}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pagestoshow}
        previousLabel="< previous"
        marginPagesDisplayed={2}
        containerClassName='flex justify-center items-baseline my-6'
        pageClassName='p-2'
        pageLinkClassName='border border-secondary-100 rounded-md p-2 hover:border-primary'
        activeClassName='btn btn-primary border-none p-0'
        previousClassName='p-2'
        previousLinkClassName='p-2'
        nextClassName=''
        nextLinkClassName='p-2'
        breakClassName=''
        breakLinkClassName='text-lg'
      />
    </>
  )
}

export default Posts