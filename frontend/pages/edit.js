
import UpdateVhook from '../components/UpdateVhook';
import PleaseSignIn from '../components/PleaseSignIn';

const Upload = props => (
    <div>
        <PleaseSignIn>
            <UpdateVhook id={props.query.id} />
        </PleaseSignIn>
    </div>
)

export default Upload;