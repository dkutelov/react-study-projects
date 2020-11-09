import { authInitialProps } from '../lib/auth'
import EditProfile from '../components/profile/edit-profile'

const EditProfilePage = ({ auth }) => <EditProfile auth={auth} />

EditProfilePage.getInitialProps = authInitialProps(true)

export default EditProfilePage
