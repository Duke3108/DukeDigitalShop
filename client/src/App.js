import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public, Blog, DetailProduct, FAQ, Service, Products, FinalRegister, ResetPassword } from './pages/public'
import path from './utils/path'
import { getCategories } from './store/asyncAction'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import { Modal } from './components';
import { AdminLayout, CreateProduct, DashBoard, ManageOrder, ManageProduct, ManageUser } from './pages/admin';
import { MemberLayout, Personal } from './pages/member';

function App() {
  const dispatch = useDispatch()
  const { isOpenModal, modalContent } = useSelector((state) => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  return (
    <div className="relative font-main">
      {isOpenModal && <Modal>{modalContent}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.SERVICE} element={<Service />} />

          <Route path={path.ALL} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>


        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>

        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
