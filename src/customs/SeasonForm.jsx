

export const SeasonForm = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div >
                <label htmlFor="Year">Year</label>
                <input className="form-control" id="year" />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input
                    id="role"
                    placeholder="name@example.com"
                />
            </div>
            <div >
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};
export default SeasonForm;