import { Timeslot } from "../../../models/timeslot.model";

interface TimeslotsViewProp {
    timeslots: Timeslot[];
}

const TimeslotsView = ({ timeslots }: TimeslotsViewProp) => {
    const noDescription = timeslots.every((timeslot) => !timeslot.description);
    return (
        <table className="table-fixed">
            <tbody>
                {timeslots.map((timeslot) => (
                    <tr key={timeslot.id}>
                        {noDescription ? (
                            <td
                                className="font-semibold text-dark text-center"
                                colSpan={2}
                            >
                                {timeslot.name}
                            </td>
                        ) : (
                            <>
                                <td className="font-semibold text-dark text-end w-1/2">
                                    {timeslot.name}
                                </td>
                                <td className="text-begin text-body w-1/2 pl-2">
                                    {timeslot.description}
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TimeslotsView;
