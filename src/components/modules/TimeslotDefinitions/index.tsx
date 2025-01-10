interface TimeslotDescription {
    name: string;
    description: string;
}

interface TimeslotDescriptionsProps {
    descriptions: TimeslotDescription[];
    onDescriptionsChange: (timeslotDescriptions: TimeslotDescription[]) => void;
}

const TimeslotDescriptions = ({
    descriptions,
    onDescriptionsChange,
}: TimeslotDescriptionsProps) => {
    return <div>TimeslotDescriptions</div>;
};

export default TimeslotDescriptions;
export type { TimeslotDescription };
