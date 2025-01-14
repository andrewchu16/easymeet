import { Timeslot } from "../../../models/timeslot.model";

interface TimeslotsViewProp {
    timeslots: Timeslot[];
}

const TimeslotsView = ({ timeslots }: TimeslotsViewProp) => {
    return (
        <table className="table-fixed border-separate border-spacing-x-4">
            <tbody>
                {timeslots.map((timeslot) => (
                    <tr key={timeslot.id}>
                        <td className="font-semibold text-dark text-end">
                            {timeslot.name}
                        </td>
                        <td className="text-begin text-body">{timeslot.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TimeslotsView;
