import UpdateVhook from '../components/UpdateVhook';

const Update = props => (
    <div>
        <UpdateVhook id={props.query.id} />
    </div>
)

export default Update;