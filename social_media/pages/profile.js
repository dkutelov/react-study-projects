import { authInitialProps } from '../lib/auth'
import Profile from '../components/profile'

const ProfilePage = ({ auth }) => <Profile userId={auth.user._id} auth={auth} />

ProfilePage.getInitialProps = authInitialProps(true)

export default ProfilePage
