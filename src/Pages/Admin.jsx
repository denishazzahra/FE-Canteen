import AdminPageComponent from '../Components/Admin'
import LoginComponent from '../Components/Login'
import CategoryPreview from '../Components/CategoryPreview'
import MenuPreview from '../Components/MenuPreview'
import UpdateMenu from '../Components/UpdateMenu'
import UpdateCategory from '../Components/UpdateCategory'

export const Login = () => {
  return(
    <LoginComponent/>
  )
}

export const AdminPage = () => {
  return(
    <AdminPageComponent/>
  )
}

export const CategoryPreviewPage = () => {
  return(
    <CategoryPreview/>
  )
}

export const MenuPreviewPage = () => {
  return(
    <MenuPreview/>
  )
}

export const UpdateMenuPage = () => {
  return(
    <UpdateMenu/>
  )
}

export const UpdateCategoryPage = () => {
  return(
    <UpdateCategory/>
  )
}
