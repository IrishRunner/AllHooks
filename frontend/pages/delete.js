
import DeleteVhook from '../components/DeleteVhook';
import PleaseSignIn from '../components/PleaseSignIn';

const Upload = props => (
    <div>
        <PleaseSignIn>
            <DeleteVhook id={props.query.id} />
        </PleaseSignIn>
    </div>
)

export default Upload;