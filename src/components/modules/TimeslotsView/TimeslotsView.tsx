import { Timeslot } from "../../../models/timeslot.model";

interface TimeslotsViewProp {
    timeslots: Timeslot[];
}

const TimeslotsView = ({ timeslots }: TimeslotsViewProp) => {
    return (
        <table className="table-fixed">
            <tbody>
                {timeslots.map((timeslot) => (
                    <tr key={timeslot.id}>
                        <td className="font-semibold text-dark">
                            {timeslot.name}
                        </td>
                        <td className="text-body">{timeslot.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TimeslotsView;
