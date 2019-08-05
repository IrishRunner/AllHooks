
import CreateItem from '../components/CreateItem';
import PleaseSignIn from '../components/PleaseSignIn';

const Upload = props => (
    <div>
        <PleaseSignIn>
            <CreateItem />
        </PleaseSignIn>
    </div>
)

export default Upload;